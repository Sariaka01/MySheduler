// The routes for tasks managing
import { Router } from 'express'
import { createTask } from './userController'

const taskRouter = Router()

taskRouter.post('/create', createTask)

export default taskRouter