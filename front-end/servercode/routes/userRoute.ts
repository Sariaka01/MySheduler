// Routes for user managing
import { Request, Response, Router } from 'express'
import { createUser, logoutUser, logUser } from './userController'
import { clearAll, clearTaskTable, clearUserTable } from './admin'
import taskRouter from './taskRoute'

const userRouter: Router = Router()

userRouter.post('/create', createUser)
userRouter.post('/login', logUser)
userRouter.post('/logout', logoutUser)
userRouter.delete('/', async (req: Request, res: Response) => {
    const { table } = req.query
    switch (table) {
        case 'user':
            await clearUserTable(req,res)
            break
        case 'task':
            await clearTaskTable(req, res)
            break
        case 'all':
            await clearAll(req, res)
            break
        default:
            console.log('Bad entry: unknown table query')
            return res.status(400) // Wrong input
    }
})
userRouter.use('/task', taskRouter) // Task must be used by logged users

export default userRouter