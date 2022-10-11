// The routes for tasks managing
import { Router } from 'express'
import { createTask, getTasks, updateTask, deleteTasks} from './taskController'

const taskRouter = Router()

taskRouter.post('/create', createTask)
taskRouter.post('/list', getTasks)
taskRouter.post('/update', updateTask)
taskRouter.post('/delete', deleteTasks)

export default taskRouter