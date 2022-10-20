// <<<<<<< HEAD
import React, { createContext, useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import Header from './header/Header'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'
import { VIEWS } from '../utils/date'
import { useNavigate } from 'react-router'
import { AppContext } from '../../App'
import './dashboard.css'
// =======
// import React, { createContext, useState, useEffect } from 'react'
// import Header from './header/Header'
// import Calendar from './calendar/Calendar'
// import Sidebar from './sidebar/Sidebar'
// import TaskManager from '../forms/TaskManager'
// import { VIEWS } from '../utils/date'
// import './dashboard.css'
// import { useNavigate } from 'react-router'
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2

export const DashboardContext= createContext()

const sorter = {
    name(taskA, taskB) {
        return taskA.name.localeCompare(taskB.name)
    },
    creator(taskA, taskB) {
        console.log('Comparing creators:', `${taskB.creator.firstname} ${taskB.creator.lastname}`.localeCompare(`${taskA.creator.firstname} ${taskA.creator.lastname}`))
        return `${taskA.creator.firstname}${taskA.creator.lastname}`.localeCompare(`${taskB.creator.firstname}${taskB.creator.lastname}`)
    },
    start(taskA, taskB) {
        return new Date(taskA.start) - new Date(taskB.start)
    },
    end(taskA, taskB) {
        return new Date(taskA.end) - new Date(taskB.end)
    },
    priority(taskA, taskB) {
        const priority = ["LOW", "MEDIUM", "HIGH"]
        return priority.indexOf(taskA.priority) > priority.indexOf(taskB.priority)? -1: priority.indexOf(taskA.priority) < priority.indexOf(taskB.priority)? 1: 0 
    }
}

function Dashboard() {
    const nav = useNavigate()
// <<<<<<< HEAD
    const { updateTimer } = useContext(AppContext)
// =======
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
    const [view, setView] = useState('yearly')
    const [viewController, setViewController] = useState(VIEWS[view])
    const [date, setDate] = useState(VIEWS[view].set(new Date(2022, 5, 20)))
    const [sortBy, setSortBy] = useState('priority')    // Sort by priority by default
// <<<<<<< HEAD
    const [selected, setSelected] = useState([])
    const [tasks, setTasks] = useState([])
// =======
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
    const userInfo = {
        token: localStorage.getItem('my-scheduler-token'),
        email: localStorage.getItem('my-scheduler-email'),
        firstname: localStorage.getItem('my-scheduler-firstname'),
        lastname: localStorage.getItem('my-scheduler-lastname')
    }
// <<<<<<< HEAD
    useEffect(updateTimer, [])  // Update timer at entries
// =======
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
    useEffect(() => {
        // console.log('effect')
        if (!userInfo.token)
            return nav('/')
        setViewController(VIEWS[view])
        setDate(VIEWS[view].set(date))
        // console.log(date)
    }, [view])
    return (
        <div id="dashboard">
{/* <<<<<<< HEAD */}
            <DashboardContext.Provider value={{tasks, setTasks , viewController, setView, setDate, userInfo, setSortBy, selected, setSelected }}>
{/* =======
            <DashboardContext.Provider value={{viewController, setView, setDate, userInfo, setSortBy }}>
>>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2 */}
                <Header view = {view} date = {date} />
                <Sidebar />
                <Calendar date={date} sorter = {sorter[sortBy]} />
            </DashboardContext.Provider>
        </div>
    )
}
export default Dashboard