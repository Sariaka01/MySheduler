import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma= new PrismaClient()

export async function createUser(req: Request, res: Response){
    const { firstname, lastname, email, password } = req.body
    let newUser: any, status: number = 200
    try {
        prisma.$connect()
        newUser= await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: await bcrypt.hash(password, 10)
            }
        })
    }
    catch (e: any) {
        let invalid: boolean = /Invalid/.test(e.message);
        [status, newUser] = [invalid? 400 : 500, { message: `${invalid? "Invalid input": "Internal server error"}` }]
    }
    finally {
        prisma.$disconnect()
        res.status(status).json(newUser)
    }
}