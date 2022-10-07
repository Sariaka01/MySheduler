import { Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { createUser, logoutUser, logUser } from './userController'

const prisma= new PrismaClient({ log: ["query"] })
const userRouter: Router = Router()

userRouter.post('/create', createUser)
userRouter.post('/login', logUser)
userRouter.post('/logout', logoutUser)

userRouter.delete('/all', async (req: Request, res: Response) => {
    prisma.$connect()
    await prisma.user.deleteMany()
    prisma.$disconnect()
    res.status(205).json({ message: "Removed successfully "})   // 205 statuscode: Reset content
})

export default userRouter