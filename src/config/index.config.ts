import dotenv from 'dotenv'

dotenv.config()

export const sqlConfig = {
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    server:'localhost',
    poll:{
        max:10,
        min:0,
        idleTimeoutMillis:30000
    },
    options:{
        encrypt:false,
        trustServerCertificate:true
    }
}