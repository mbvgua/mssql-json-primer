import { Router } from 'express'
import { addUser, deleteUser, getUsers, searchUser, updateUser } from '../controllers/app.controllers'


const appRouter = Router()

appRouter.post('',addUser)
appRouter.get('',getUsers)
appRouter.get('/search',searchUser)
appRouter.patch('/update/:id',updateUser)
appRouter.delete('/delete/:id',deleteUser)

export default appRouter

