// <<<<<<< HEAD
import React, { useState, useEffect, createContext, useContext } from 'react'
// =======
// import React, { useState, useEffect, createContext } from 'react'
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './task-form.css'
import { LIST } from '../../test/list'
import { getLocaleDateTime } from '../utils/date'
import ParticipantTable from './ParticipantTable'
// <<<<<<< HEAD
import { AppContext } from '../../App'
// =======
// import Login from './Login'
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2

export const ParticipantsContext = createContext(null)

function TaskManager() {
// <<<<<<< HEAD
    const { updateTimer } = useContext(AppContext);
    const { id } = useParams()
    const nav = useNavigate()
    const token = localStorage.getItem('my-scheduler-token')
    const userEmail = localStorage.getItem('my-scheduler-email')
    const userFirstname = localStorage.getItem('my-scheduler-firstname')
    const userLastname = localStorage.getItem('my-scheduler-lastname')
    const [taskId, setTaskId] = useState(id)
    const [readOnly, setReadOnly] = useState(false)
    const [taskInfo, setTaskInfo] = useState({
        name: '',
        creator: `${userFirstname} ${userLastname}`,
// =======
//     const { id } = useParams()
//     const nav = useNavigate()
//     const token = localStorage.getItem('my-scheduler-token')
//     const [taskId, setTaskId] = useState(id)
//     const [taskInfo, setTaskInfo] = useState({
//         name: '',
//         creator: '',
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
        description: '',
        priority: 'LOW',
        startDate: '',
        startTime: '00:00:00',
        endDate: '',
        endTime: '00:00:00',
        beforeStart: 0,
// <<<<<<< HEAD
        participants: [userEmail]
    })
    useEffect(() => {

        // console.log(token)
// =======
//         participants: []
//     })
//     useEffect(() => {

//         console.log(token)
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2

        if (!token)
            return nav('/')
        if(taskId) {
            Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/get`, {
                token,   // Get the token
                taskId
            }).then(({ data }) => {
                console.log(data)
                let task = data
                const { day: sDay, month: sMonth, year: sYear, hour: sHour, min: sMin, sec: sSec } = getLocaleDateTime(task.start)
                const { day: eDay, month: eMonth, year: eYear, hour: eHour, min: eMin, sec: eSec } = getLocaleDateTime(task.end)
                setTaskInfo({
                    name: task.name,
                    creator: `${task.creator.firstname} ${task.creator.lastname}`,
                    description: task.description,
                    priority: task.priority,
                    // Months are counted from 0
                    startDate: `${sYear}-${sMonth + 1 < 10 ? '0' : ''}${sMonth + 1}-${sDay < 10 ? '0' : ''}${sDay}`,
                    startTime: `${sHour < 10 ? '0' : ''}${sHour}:${sMin < 10 ? '0' : ''}${sMin}:${sSec < 10 ? '0' : ''}${sSec}`,
                    endDate: `${eYear}-${eMonth + 1 < 10 ? '0' : ''}${eMonth + 1}-${eDay < 10 ? '0' : ''}${eDay}`,
                    endTime: `${eHour < 10 ? '0' : ''}${eHour}:${eMin < 10 ? '0' : ''}${eMin}:${sSec < 10 ? '0' : ''}${eSec}`,
                    beforeStart: task.beforeStart,
                    participants: task.participants.map(participant => participant.email)
                })
// <<<<<<< HEAD
                setReadOnly(task.creator.email != userEmail)
// =======
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
            }).catch(() => {
                nav('/task')
            })

        }
    }, [])

    async function submit(e) {
        e.preventDefault()
        // const token = localStorage.getItem('my-scheduler-token')
        // Those are locals
        if (!token) {
            alert('Session expired')
            nav('/')
            return
        }
        const start = new Date(`${taskInfo.startDate} ${taskInfo.startTime}`).toISOString() // Start datetime
        const end = new Date(`${taskInfo.endDate} ${taskInfo.endTime}`).toISOString() // End
        let res
        try {
            if (!taskId) {
                console.log('Creating task...')
                res = await Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/create`, {
                    token,
                    data: {
                        ...taskInfo,
                        beforeStart: +taskInfo.beforeStart,
                        start,
                        end
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
// <<<<<<< HEAD
//                 console.log(taskInfo)
// =======
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
                res = await Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/update`, {
                    token,
                    taskId,
                    data: {
                        ...taskInfo,
                        beforeStart: +taskInfo.beforeStart,
                        start,
                        end
                    }
                })
                if (res.status == 200) {
                    alert("Task updated successfully")
                }
            }
// <<<<<<< HEAD
            updateTimer()   // Update the timers
// =======
            
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
        }
        catch(e) {
            alert(e.response.data.message)
        }
    }
    function handleInfos(e) {
        console.log('Handling')
        setTaskInfo({
            ...taskInfo, [e.target.name]: e.target.value
        })
        // console.log(`Updated ${e.target.name} to ${e.target.value}`)
    }
    function handleParticipants(newParticipant, oldParticipant) {
        // If idx is given then it's an edition
        // console.log("Adding: " + emailRef.current.value)
        let newList = taskInfo.participants
            .map(p => p == oldParticipant ? newParticipant : p) // For edition
            .concat(newParticipant) // If we have a new participant
            .filter(p => p && p != oldParticipant)  // In case of remove or input left blank
            .sort()
        setTaskInfo({
            ...taskInfo, participants: [...new Set(newList)]    // No redudancy
        })
// <<<<<<< HEAD
//         console.log('Participants : ', [...new Set(newList)])
// =======
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
    }
    function generateList(participants) {
        let i= 0
        return <ul>
            {participants.map(participant => <li key= {i++}>{participant}</li>)}
        </ul>
    }
// <<<<<<< HEAD
    
    async function deleteTask(e) {
        e.preventDefault()
        if (window.confirm('Remove task?')) {
            try {
                const res = await Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/delete`, {
                    token,
                    taskIdList: [taskId]
                })
                nav('/dashboard')
            }
            catch {
                alert('Couldn\'t delete the task')
            }
        }
    }
    // console.log('first log ', new Date(2022, 0, 1))
//     return (
//         <div id= 'task-manager'>
//             <form onSubmit={submit}>
//                 <h3>Creator: { taskInfo.creator }</h3>
//                 <label htmlFor='task-name'>Name: </label>
//                 <input id='task-name' type="text" name="name" value={taskInfo.name} onChange={handleInfos} required />
//                 <br/>
//                 <label htmlFor='task-desc'>Description: </label>
//                 <textarea id='task-desc' rows={3} cols={20} type="text" name="description" value={taskInfo.description} onChange={handleInfos} /><br />
//                 <br/>
//                 <label htmlFor='priority'>Priority</label>
//                 <select id='priority' className={`priority-${taskInfo.priority.toLowerCase()}`} name="priority" value={taskInfo.priority} onChange={handleInfos}>
//                     <option value= "HIGH">HIGH</option>
//                     <option value= "MEDIUM">MEDIUM</option>
//                     <option value= "LOW">LOW</option>
//                 </select><br/>

//                 <label htmlFor='start-date'>Start date: </label>
//                 <input id='start-date' type="date" name='startDate' value={taskInfo.startDate} onChange={handleInfos} required />
//                 <br/>
//                 <label htmlFor='start-time'>Start time: </label>
//                 <input id='start-time' type="time" name="startTime" value={taskInfo.startTime} onChange={handleInfos} />
//                 <br/>
//                 <label htmlFor='end-date'>End date: </label>
//                 <input id='end-date' type="date" name='endDate' value={taskInfo.endDate} onChange={handleInfos} required />
//                 <br/>
//                 <label htmlFor='end-time'>End time: </label>
//                 <input id='end-time' type="time" name="endTime" value={taskInfo.endTime} onChange={handleInfos} />
//                 <br/>
//                 <label htmlFor="before-start">Notification timer: </label>
//                 <input id="before-start" type="number" name="beforeStart" value={taskInfo.beforeStart} onChange={handleInfos} /> minutes<br />
                
//                 <ParticipantsContext.Provider value={{ handleParticipants }}>
//                     {/* To handle the values from different users */}
//                     <ParticipantTable participants={taskInfo.participants} participates={taskInfo.participants.includes(userEmail)} readOnly={ readOnly } />
//                 </ParticipantsContext.Provider>
//                 {!readOnly && <>
//                     <button type="submit">{`${taskId ? 'Update ' : 'Create '}`}</button>
//                     {taskId && <button onClick = {deleteTask}>Delete</button>}
//                 </>}
//             </form>
//         </div>
// =======

    // console.log('first log ', new Date(2022, 0, 1))
    return (
        <div className="container-login">
            <div className="wrap-login">
                <form className="login-form flex create-form" onSubmit={submit}>
                    <div className="left">
                        <h5>By:</h5>
                        <h3>{taskInfo.creator}</h3>
                        <br/>
                        <div className="wrap-input">
                            <label htmlFor='task-name'>Name: </label>
                            <input id='task-name' type="text" className="input" name="name" value={taskInfo.name} onChange={handleInfos} required />
                        </div>
                    
                        <div className="wrap-input">
                            <label htmlFor='task-desc'>Description: </label>
                            <textarea id='task-desc' rows={5} className="input" cols={10} type="text" name="description" value={taskInfo.description} onChange={handleInfos} />
                        </div>

                        <div className="wrap-input">
                            <label htmlFor='priority'>Priority</label>
                            <select id='priority' className={`priority-${taskInfo.priority.toLowerCase()} classic input`} name="priority" value={taskInfo.priority} onChange={handleInfos}>
                                <option value= "HIGH">HIGH</option>
                                <option value= "MEDIUM">MEDIUM</option>
                                <option value= "LOW">LOW</option>
                            </select><br/>
                        </div>
                    </div>


                    <div className="right">

                        <div className="wrap-input">
                            <label htmlFor='start-date'>Start date: </label>
                            <input id='start-date' type="date" className="input" name='startDate' value={taskInfo.startDate} onChange={handleInfos} required />
                        </div>

                        <div className="wrap-input">
                            <label htmlFor='start-time'>Start time: </label>
                            <input id='start-time' type="time" className="input" name="startTime" value={taskInfo.startTime} onChange={handleInfos} />
                        </div>

                        <div className="wrap-input">
                            <label htmlFor='end-date'>End date: </label>
                            <input id='end-date' type="date" className="input" name='endDate' value={taskInfo.endDate} onChange={handleInfos} required />
                        </div>

                        <div className="wrap-input">
                            <label htmlFor='end-time'>End time: </label>
                            <input id='end-time' type="time" name="endTime" value={taskInfo.endTime} onChange={handleInfos} />
                        </div>

                        <div className="wrap-input">
                            <label htmlFor="before-start">Notification (in minutes): </label>
                            <input id="before-start" type="number" name="beforeStart" value={taskInfo.beforeStart} onChange={handleInfos} />
                        </div>

                        <div className="wrap-input">

                        </div>
                        
                        {/* <button type="submit" className="btn">{`${taskId ? 'Update ' : 'Create '}`}task</button> */}
                        
                    </div>
                    <ParticipantsContext.Provider value={{ handleParticipants }}>
                        {/* To handle the values from different users */}
                        <ParticipantTable participants={ taskInfo.participants } participates={taskInfo.participants.includes(userEmail)} readOnly={ readOnly } />
                    </ParticipantsContext.Provider>
                    {!readOnly && <div className='controllers'>
                        <button className = "btn" type="submit">{`${taskId ? 'Update ' : 'Create '}`}</button>
                        {taskId && <button className = "btn delete" onClick = {deleteTask}>Delete</button>}
                    </div>}
                </form>

            </div>
        </div>     


// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
  )
}

export default TaskManager