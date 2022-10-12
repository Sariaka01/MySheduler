import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getOperationTime } from "../globals/date-utils";

const prisma = new PrismaClient()

export async function selectAllUser(req: Request, res: Response) {
    prisma.$connect()
    const { rowCount } = req.query
    try {
        const users = await prisma.user.findMany({
            select: {
                firstname: true,
                lastname: true,
                email: true
            },
            orderBy: {
                email: 'asc'
            },
            take: <number | undefined>rowCount
        })
        res.status(200).json({ users })
    }
    catch {
        res.status(500)
    }
}

export async function clearUserTable(req: Request, res: Response) {
    prisma.$connect()
    try {
        await prisma.user.deleteMany()
        console.log(`${getOperationTime()}: User table cleared`)
        res.status(205).json({ message: "User table cleared successfully "})   // 205 statuscode: Reset content
    }
    catch {
        // Internal server error
        res.status(500)
    }
    finally {
        prisma.$disconnect()
    }
}

export async function clearTaskTable(req: Request, res: Response) {
    prisma.$connect()
    try {
        await prisma.task.deleteMany()
        console.log(`${getOperationTime()}: Task table cleared`)
        res.status(205).json({ message: "Task table cleared successfully "})   // 205 statuscode: Reset content
    }
    catch {
        // Internal server error
        res.status(500)
    }
    finally {
        prisma.$disconnect()
    }
}

export async function clearAll(req: Request, res: Response) {
    prisma.$connect()
    try {
        await prisma.$transaction([
            prisma.task.deleteMany(),
            prisma.user.deleteMany()
        ])
        console.log(`${getOperationTime()}: Database cleared`)
        res.status(205).json({ message: "User table cleared successfully "})   // 205 statuscode: Reset content
    }
    catch {
        // Internal server error
        res.status(500)
    }
    finally {
        prisma.$disconnect()
    }
}