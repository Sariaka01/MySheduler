import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './task-form.css'
import { LIST } from '../../test/list'
import { getLocaleDateTime } from '../utils/date'


function TaskManager({ id }) {
    const nav = useNavigate()
    const [taskId, setTaskId] = useState(id)
    const [taskInfo, setTaskInfo] = useState({
        name: '',
        creator: '',
        description: '',
        priority: 'LOW',
        startDate: '',
        startTime: '00:00:00',
        endDate: '',
        endTime: '00:00:00',
        beforeStart: 0
    })
    let params = useParams()
    if (taskId) {
        Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/get`, {
            token: localStorage.getItem('token'),   // Get the token
            taskId
        }).then(({ data }) => {
            console.log()
            let task = data
            const { day: sDay, month: sMonth, year: sYear, hour: sHour, min: sMin, sec: sSec } = getLocaleDateTime(task.start)
            const { day: eDay, month: eMonth, year: eYear, hour: eHour, min: eMin, sec: eSec } = getLocaleDateTime(task.end)
            setTaskInfo({
                name: task.name,
                creator: `${task.creator.firstname} ${task.creator.lastname}`,
                description: task.description,
                priority: task.priority,
                startDate: `${sYear}-${sMonth < 10 ? '0': ''}${sMonth}-${sDay < 10 ? '0': ''}${sDay}`,
                startTime: `${sHour}:${sMin}:${sSec}`,
                endDate: `${eYear}-${eMonth < 10 ? '0': ''}${eMonth}-${eDay < 10 ? '0': ''}${eDay}`,
                endTime: `${eHour}:${eMin}:${eSec}`,
                beforeStart: task.beforeStart
            })
        })

    }

    async function submit(e) {
        e.preventDefault()
        // Those are locals
        const token = localStorage.getItem('token')
        if (!token) {
            alert('Session expired')
            nav('/')
            return
        }
        const start = new Date(`${taskInfo.startDate} ${taskInfo.startTime}`).toISOString() // Start datetime
        const end = new Date(`${taskInfo.endDate} ${taskInfo.endTime}`).toISOString() // End datetime
        let res
        try {
            if (!taskId) {
                console.log('Creating task...')
                res = await Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/create`, {
                    token,
                    data: {
                        ...taskInfo,
                        start,
                        end,
                        participants: ["safidy.herinirina@gmail.com"]
                    }
                })
                console.log(res.data.task_id)
                if (res.status == 201) {
                    alert("Task created successfully")
                    setTaskId(res.data.task_id)
                }
            }
            else {
                console.log('Updating task...')
                res = await Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/update`, {
                    token,
                    taskId,
                    data: {
                        ...taskInfo,
                        start,
                        end,
                        participants: ["safidy.herinirina@gmail.com"]
                    }
                })
                console.log(res.data.task_id)
                if (res.status == 200) {
                    alert("Task updated successfully")
                }
            }
            
        }
        catch(e) {
            console.log(e)
        }
    }
    function handleInfos(e) {
        setTaskInfo({
            ...taskInfo, [e.target.name]: e.target.value
        })
        // console.log(`Updated ${e.target.name} to ${e.target.value}`)
    }
    function generateList(participants) {
        let i= 0
        return <ul>
            {participants.map(participant => <li key= {i++}>{participant}</li>)}
        </ul>
    }

    // console.log('first log ', new Date(2022, 0, 1))
    return (
        <form onSubmit={submit}>
            <input type = "text" name = "name" value= { taskInfo.name } onChange = { handleInfos } required />
            <textarea rows= {3} cols= {10} type = "text" name = "description" value= { taskInfo.description } onChange = { handleInfos } /><br />
            
            <select className= {`priority-${taskInfo.priority.toLowerCase()}`} name = "priority" value= {taskInfo.priority} onChange= { handleInfos }>
                <option value= "HIGH">HIGH</option>
                <option value= "MEDIUM">MEDIUM</option>
                <option value= "LOW">LOW</option>
            </select>

            <input type= "date" name = 'startDate' value= { taskInfo.startDate } onChange= { handleInfos } required />
            <input type= "time" name = "startTime" value= { taskInfo.startTime } onChange= { handleInfos } />
            
            <input type = "date" name = 'endDate' value= { taskInfo.endDate } onChange= { handleInfos } required />
            <input type = "time" name="endTime" value={ taskInfo.endTime } onChange={handleInfos} />
            
            <label htmlFor="before-start">Notification timer: </label>
            <input id="before-start" type="number" name="beforeStart" value={taskInfo.beforeStart} onChange={handleInfos} /> minutes<br />
            <button type= "submit">Create task</button>
        </form>
  )
}

export default TaskManager