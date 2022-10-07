import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'

const prisma= new PrismaClient()

export async function createUser(req: Request, res: Response){
    const { name } = req.body
    let newUser: any, status: number = 200
    try {
        prisma.$connect()
        // Create the user
    }
    catch (e: any) {
        let err_mess: string = e.message.split('\n\n').slice(-2, -1).join(''); // Semicolon is still important
        [status, newUser] = [/Invalid/.test(e.message)? 400 : 500, { message: `${err_mess}` }]
    }
    finally {
        prisma.$disconnect()
        res.status(status).json(newUser)
    }
}