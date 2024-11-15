import { NextFunction, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../../config/index.config'
import { User } from '../models/users.models'
import { buildFilterQuery } from '../helpers/search.helpers'


dotenv.config()

export async function addUser(request:Request, response:Response){
    // function add a new user to db
    const id = uid()
    const {username, profile, parameters} = request.body
    const profileJson = JSON.stringify(profile)
    const parametersJson = JSON.stringify(parameters)
    try{
        const pool = await mssql.connect(sqlConfig) //connect to the db
        await pool.request()    //make a request
        .input("id",id)
        .input("username",username)
        .input("profileJson",profileJson)
        .input("parametersJson",parametersJson)
        .execute("sqlJsonCreate")

        return response.status(200).json({message:'User successfully added!'})
    }catch(error){
        console.error('Error adding user', error)
        return response.status(500).json({error:`Internal server error:${error}`})
    }
}


export async function searchUser(request: Request, response: Response){
    try {
        const { filters, values } = buildFilterQuery(request.body)

        // Base query
        let query = "SELECT * FROM sqlJson"
        if (filters) {
            query += ` WHERE ${filters} AND isDeleted=0`
        }

        // Establish database connection
        const pool = await mssql.connect(sqlConfig)
        const sqlRequest = pool.request()

        // Inject parameters into request
        Object.keys(values).forEach(key => {
            sqlRequest.input(key, values[key])
        });

        // Execute query
        const users = (await sqlRequest.query(query)).recordset as Array<User>
        if (users.length !== 0){
            console.log(users)
            return response.status(200).json(users);
        } else {
            return response.status(400).json({error:'User with specified parameetrs does not exist'})
        }
    } catch (error) {
        return response.status(500).json({ error: "Server error during search" });
    }
};


export async function getUsers(request:Request, response:Response){
    // function gets all users from db
    try {
        const pool = await mssql.connect(sqlConfig)
        const users = (await pool.request()
        .execute("getSqlJsonUsers ")).recordset as Array<User>

        return response.status(200).send(users)
    }catch(error){
        console.error('Error retrieving user in the system', error)
        return response.status(500).json({error:`Internal server errror: ${error}`})
    }
}


export async function updateUser(request:Request<{id:string}>, response:Response){
    // function will update a user info in regards to id passed

    const id = request.params.id
    const {username, profile, parameters} = request.body
    const profileJson = JSON.stringify(profile)
    const parametersJson = JSON.stringify(parameters)

    const pool = await mssql.connect(sqlConfig)
    try {
        const user = ( await pool.request()
        .input("id",id)
        .execute("getSqlJsonById")).recordset as Array<User>
        console.log(user)
        if (user.length !== 0){
            await pool.request()
            .input("id",id)
            .input("username",username)
            .input("profileJson",profileJson)
            .input("parametersJson",parametersJson)
            .execute("sqlJsonUpdate")

            return response.status(200).send(`User updated succes`)
        } else {
            return response.status(400).json({error:'User does not exist.'})
        }
    }catch(error){
        console.error('Failed to update user', error)
        return response.status(500).json({error:`Internal server error ${error}`})
    }
}


export async function deleteUser(request:Request<{id:string}>, response:Response){
    // delete a user with the passed id
    const id = request.params.id
    try{
        const pool = await mssql.connect(sqlConfig)
        const user = (await pool.request()
                    .input('id',id)
                    .execute('getSqlJsonById')).recordset as Array<User>
        
        if(user.length !== 0){
            await pool.request()
                .input('id',id)
                .execute('sqlJsonDelete')

            return response.status(200).json({message:`${user[0].username} has succesfully been deleted`})
        } else {
            return response.status(400).json({error:'That user does not exist'})
        }
    } catch(error){
        console.error('Internal server error', error)
        return response.status(500).json({error:`Internal seerver error: ${error}`})
    }
}
