// Task operations
import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { getPayload } from "./userController"
import { getOperationTime } from "../globals/date-utils"
import { GeneralObject } from "../globals/types"

const SELECTOR = {
                    task_id: true,
                    name: true,
                    description: true,
                    start: true,
                    end: true,
                    priority: true,
                    beforeStart: true,
                    creator: {
                        select: {
                            firstname: true,
                            lastname: true,
                            email: true
                        }
                    },
                    participants: {
                        select: {
                            firstname: true,
                            lastname: true,
                            email: true
                        }
                    }
                }

const prisma = new PrismaClient()

export async function createTask(req: Request, res: Response) {
    // Task creation
    try {
        const payload = getPayload(req)
        if (!payload) 
            return res.status(404).json({ message: 'User not found' })
        console.log(getOperationTime() + ':\n')
        console.log(`${payload.email} creating a new task...\n`)

        console.log('Creating...\n')
        const { name, description, start, end, priority, beforeStart } = req.body.data
        let participants: string[] | null = req.body.data.participants

        if (!participants) {
            res.status(400).json({ message: `A task needs at least one participant`})
        }

        let unknown: string[]= []
        let valid: string[] = []
        console.log('Filtering participants')
        // Filtering emails
        for (let email of <string[]>participants) {
            let id= await prisma.user.findUnique({
                    where: {
                        email: email
                    }
            }).catch(e => {
                    console.log('From filtering participants ' + e.message)
                })
            if (id) {
                valid.push(email)
            }
            else {
                // For participants not in the database
                unknown.push(email)
            }
        }   // End for

        console.log(unknown)
        /*console.log(valid, unknown)
        console.log(name, start, end, beforeStart, priority, description)
        console.log(participants)
        
        console.log('Done filtering')*/

        if (!valid.length) {
            res.status(400).json({ message: `No valid email`, data: unknown })
        }
        const newTask = await prisma.task.create({
            data: {
                name,
                start,
                end,
                beforeStart,
                priority,
                description: description,
                creator: {
                    connect: {
                        email: payload.email
                    }
                },
                participants: {
                    connect: valid.map(participant => ({ email: participant }))
                }
            },
            select: SELECTOR
        }).catch(e => {
            console.log(e.message)
        })
        
        console.log(`Creation done, task id: ${(<GeneralObject>newTask)['task_id']}`)

        // Filter the inputs to see if there are any invalid given email in the inputs
        /*let unknown = newTask.participants.filter(participant => !participants.includes(participant.email))*/
        if (unknown.length)
            return res.status(400).json({ unknown })
        return res.status(201).json(newTask)
    }
    catch {
        res.status(500)
    }
    finally {
        prisma.$disconnect()
    }
}

export async function getTasks(req: Request, res: Response) {
    // Get all the tasks for a given year
    try {
        const payload = getPayload(req)
        const { start, end } = req.body
        if (!payload) 
            return res.status(404).json({ message: 'User not found' })
        // if (!year)
        //     return res.status(400).json({ message: 'Year is missing' })
        
        // const [start, end] = [`${year}-01-01T00:00:00.000Z`, `${year}-12-31T23:59:59.999Z`]
        console.log(getOperationTime() + ':\n')
        console.log(`getting tasks of ${payload.email} ${start != undefined? 'from ' + new Date(start).toUTCString() + ' to ' + new Date(end).toUTCString(): ''}\n`)
        const taskList = await prisma.task.findMany({
            where: {
                OR: [
                    {
                        creator: {
                            email: payload.email
                        }
                    },
                    {
                        participants: {
                            some: {
                                email: payload.email
                            }
                        }
                    }
                ],
                // If we have start date
                start: {
                    gte: start,
                    lte: end
                }
            },
            select: SELECTOR,
            orderBy: {
                start: "asc"
            }
        })
        return res.status(200).json(taskList)
    }
    catch {
        res.status(500)
    }
    finally {
        prisma.$disconnect()
    }
}

export async function getTaskById(req: Request, res: Response) {
    try {
        const payload = getPayload(req)
        const { taskId } = req.body
        if (!payload || !taskId) 
            return res.status(404).json({ message: `${payload? 'User': 'Task'} not found` })
        console.log(getOperationTime() + ':\n')
        console.log(`getting tasks of ${payload.email} with id ${taskId}}\n`)
        const task = await prisma.task.findMany({
            where: {
                OR: [
                    {
                        creator: {
                            email: payload.email
                        }
                    },
                    {
                        participants: {
                            some: {
                                email: payload.email
                            }
                        }
                    }
                ],
                // If we have start date
                task_id: taskId
            },
            select: SELECTOR,
            take: 1
        })
        return res.status(200).json(task[0])
    }
    catch {
        res.status(500)
    }
    finally {
        prisma.$disconnect()
    }
}

/*export async function getTasksBetween() {
    // let tas
}*/

export async function updateTask(req: Request, res: Response) {
    try {
        const payload = getPayload(req)
        if (!payload) 
            return res.status(404).json({ message: 'User not found' })
        const { taskId } = req.body
        if (!taskId)
            return res.status(400).json({ message: 'Task not found' })
        const { name, description, start, end, priority, beforeStart, participants } = req.body.data

        // Get participants email list
        let unknown= []
        let participantsId = []
        for (let email of participants) {
            let id= await prisma.user.findUnique({
                    where: {
                        email: email
                    },
                    select: {
                        user_id: true
                    }
            })
            if (id) {
                participantsId.push(id)
            }
            else {
                // For participants not in the database
                unknown.push(email)
            }
        }   // End for

        if (!participantsId.length)
            return res.status(400).json({ message: `No valid participants found in list\n\t${unknown.join('\n\t')}`, emails: unknown })    
        console.log(getOperationTime() + ':\n')
        console.log(`${payload.email} updating task id ${taskId}\n`)
        
        // Use updateMany to allow match of task_id and creator
        const newTask = await prisma.task.updateMany({
            where: {
                task_id: taskId,
                creator: {
                    email: payload.email
                }
            },
            data: {
                name,
                description,
                start,
                end,
                priority,
                beforeStart
            }
        })
        // Use update many to find if we have an updated item
        if (!newTask.count) {
            return res.status(404).json({ message: 'Task not found' })
        }
        // Update paricipants if there is any update to be made
        if (participantsId.length) {
            await prisma.task.update({
            where: {
                    task_id: taskId
            },
            data: {
                participants: {
                    connect: <any>participantsId
                }
            },

            })
        }
        if (unknown.length)
            return res.status(400).json({ message: `${unknown.length} participant(s) not found\n\t${unknown.join('\n\t')}`, emails: unknown })
        return res.status(200).json({ message: `${newTask.count} tasks(s) updated successfully` })
    }
    catch (e: any) {
        console.log(`${getOperationTime()}: ERROR! ${e.message}`)
        res.status(500)
    }
    finally {
        prisma.$disconnect()
    }
}

export async function deleteTasks(req: Request, res: Response) {
    try {
        const payload = getPayload(req)
        if (!payload) 
            return res.status(404).json({ message: 'User not found' })
        const { taskIdList } = req.body

        if (!taskIdList.length)
            return res.status(400).json({ message: 'task not found' })

        console.log(getOperationTime() + ':\n')
        console.log(`${payload.email} removing ${taskIdList.length} task(s)\n`)

        const removedTask = await prisma.task.deleteMany({
            where: {
                task_id: { in: taskIdList },
                creator: {
                    email: payload.email
                }
            }
        })
        if (removedTask.count != taskIdList.length) {
            return res.status(404).json({ message: `${taskIdList.length-removedTask.count} tasks(s) not found`, count: taskIdList.length-removedTask.count  })
        }
        return res.status(200).json({ message: `${removedTask.count} task(s) removed successfully`, count: removedTask.count })
    }
    catch {
        res.status(500)
    }
    finally {
        prisma.$disconnect()
    }
}
