import { Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'


dotenv.config()

export async function helloWorld(request:Request, response:Response){
    return response.status(200).send({message:'hello world'})
}
