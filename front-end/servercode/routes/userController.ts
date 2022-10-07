import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../globals/variable"
import { GeneralObject } from "../globals/types"

const prisma= new PrismaClient()

async function findByEmail(email: string, ...fields: string[]): Promise<GeneralObject|number> {
    try {
        let user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: Object.fromEntries(fields.map(e => [e, true]))
        })
        if (user)
            return user
        return 0    // 0 if noone found
    }
    catch {
        return -1   // Server error
    }
    finally {
        prisma.$disconnect()
    }
}

export async function createUser(req: Request, res: Response){
    const { firstname, lastname, email, password } = req.body
    let newUser: any, status: number = 201  // Status code 201 == Created
    const now = new Date().toISOString()
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
        console.log(`${now}: ${status == 201?'created ': 'error '}${newUser.email? newUser.email: newUser}`)
    }
}

export async function logUser(req: Request, res: Response) {
    const { email, password } = req.body
    const now = new Date().toISOString()
    const user = await findByEmail(email, "email", "password")

    switch (user) {
        case 0:
            return res.status(404).json({ message: 'Wrong username or password' })
        case -1:
            return res.status(500)
        default:
            if (await bcrypt.compare(password, (<GeneralObject>user)["password"])) {
                let token = jwt.sign({ email }, TOKEN_SECRET)
                console.log(`${now}: connected ${email}`)
                res.status(200).json({ token })
            }
            else {
                res.status(404).json({ message: 'Wrong email or password'})    
            }
    }
}

export async function logoutUser(req: Request, res: Response) {
    const now= new Date().toISOString()
    try {
        const payload = jwt.verify(req.body.token, TOKEN_SECRET) as jwt.JwtPayload
        const user = await findByEmail(payload.email, "email")
        switch (user) {
            case -1:
                return res.status(500)
            default:
                console.log(`${now}: logout ${user? (<GeneralObject>user)["email"]: "unexisting user"}`)
                return res.status(user? 200: 404).json({ message: user? 'Logout successful': 'No user found' })
        }
    }
    catch {
        console.log('Invalid token')
        res.status(400).json({ message: 'Invalid token provided'})
    }
}