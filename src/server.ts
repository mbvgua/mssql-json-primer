import express,{ json } from 'express'
import dotenv from 'dotenv'
import appRouter from './api/routes/app.routes'


dotenv.config()

const app = express()   //initilaize the express application
const port = process.env.PORT   //get port to run on from .env 
app.use(json())     //addbody to requests

// define the application routes
app.use('/app',appRouter)

app.listen(port, ()=>{
    console.log(`[server]:server is running at http://localhost:${port}`)
})


