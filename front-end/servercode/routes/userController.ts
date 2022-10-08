// The function to manage user routes
import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { TOKEN_SECRET } from "../globals/variable"
import { GeneralObject } from "../globals/types"
import { getOperationTime } from "../globals/date-utils"

const prisma= new PrismaClient()

function getPayload(req: Request): jwt.JwtPayload | null {
    // Return a payload containing only the email of the actual user from a token or null if the token is invalid
    try {
        const token= req.body.token || req.headers.cookie?.split('=')[1]
        const payload = jwt.verify(token, TOKEN_SECRET) as jwt.JwtPayload
        return payload
    }
    catch {
        return null
    }
}

async function findByEmail(email: string, ...fields: string[]): Promise<GeneralObject | number> {
    // Find an user by email and return the given fields
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
    try {
        prisma.$connect()
        newUser= await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: await bcrypt.hash(password, 10),  // Bcrypt encryption
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
        console.log(`${getOperationTime()}: ${status == 201?'created ': 'error '}${newUser.email? newUser.email: newUser.message}`)
    }
}

export async function logUser(req: Request, res: Response) {
    const { email, password } = req.body
    const user = await findByEmail(email, "email", "password")

    switch (user) {
        case 0:
            return res.status(404).json({ message: 'Wrong username or password' })
        case -1:
            return res.status(500)
        default:
            if (await bcrypt.compare(password, (<GeneralObject>user)["password"])) {
                let token = jwt.sign({ email }, TOKEN_SECRET)   // Sign the email with the token
                console.log(`${getOperationTime()}: connected ${email}`)
                res.set('Set-Cookie', `session=${token}`)
                res.status(200).json({ token })
            }
            else {
                res.status(404).json({ message: 'Wrong email or password'})    
            }
    }
}

export async function logoutUser(req: Request, res: Response) {
    try {
        const payload = getPayload(req)
        if (!payload)
            throw new Error()

        const user = await findByEmail(payload.email, "email")
        switch (user) {
            case -1:
                return res.status(500)
            default:
                console.log(`${getOperationTime()}: logout ${user ? (<GeneralObject>user)["email"] : "unexisting user"}`)              
                res.set('Set-Cookie', 'session=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;')
                return res.status(user? 200: 404).json({ message: user? 'Logout successful': 'No user found' })
        }
    }
    catch {
        console.log('Invalid token')
        res.status(400).json({ message: 'Invalid token provided'})
    }
}

export async function createTask(req: Request, res: Response) {
    // Task creation
    try {
        const payload = getPayload(req)
        if (!payload) 
            return res.status(404).json({ message: 'User not found' })
        console.log(getOperationTime() + ':\n')
        console.log(`${payload.email} creating a new task...\n`)
        const user = await findByEmail(payload.email, "user_id") // Get the user with only the id field
        console.log(user)
        switch (user) {
            case 0:
                return res.status(404).json({ message: 'User not found' })
            case -1:
                return res.status(500)
            default:
                console.log('Creating...\n')
                const id = (<GeneralObject>user)['user_id']
                const { name, start, end, priority, beforeStart, participants } = req.body.data
                console.log(
                    {
                        name, start, end, priority, beforeStart, participants
                    }
                )
                const newTask = await prisma.task.create({
                    data: {
                        name,
                        creator: {
                            connect: {
                                user_id: id
                            }
                        }
                    },
                    select: {
                        task_id: true
                    }
                })
                console.log(`Creation done, task id: ${newTask.task_id}`)
                return res.status(200).json(newTask)
        }   // End switch
    }
    catch {
        res.status(500)
    }
    finally {
        prisma.$disconnect()
    }
}