import dotenv from 'dotenv'
import { Config } from '../api/models/database.models'

dotenv.config()

export const sqlConfig:Config = {
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    server:'localhost',
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis:30000
    },
    options:{
        encrypt:false,  //true for Azure connection
        trustServerCertificate:true     //change to false for production
    }
}