import { Router } from 'express'
import { addUser, getUsers, updateUser } from '../controllers/app.controllers'


const appRouter = Router()

appRouter.post('',addUser)
appRouter.get('',getUsers)
appRouter.patch('/update/:id',updateUser)
// appRouter.get('/:id',getUser)
// appRouter.post('/delete/:id',deleteUser)

export default appRouter

