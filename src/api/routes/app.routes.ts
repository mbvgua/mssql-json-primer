import { Router } from 'express'
import { helloWorld } from '../controllers/app.controllers'


const appRouter = Router()

appRouter.post('',helloWorld)

export default appRouter

