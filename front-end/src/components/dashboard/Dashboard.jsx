import React, { createContext, useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import Header from './header/Header'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'
import { VIEWS } from '../utils/date'
import { useNavigate } from 'react-router'
import { AppContext } from '../../App'
import './dashboard.css'

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
    const { updateTimer } = useContext(AppContext)
    const [view, setView] = useState('yearly')
    const [viewController, setViewController] = useState(VIEWS[view])
    const [date, setDate] = useState(VIEWS[view].set(new Date(2022, 5, 20)))
    const [sortBy, setSortBy] = useState('priority')    // Sort by priority by default
    const [selected, setSelected] = useState([])
    const [tasks, setTasks] = useState([])
    const userInfo = {
        token: localStorage.getItem('my-scheduler-token'),
        email: localStorage.getItem('my-scheduler-email'),
        firstname: localStorage.getItem('my-scheduler-firstname'),
        lastname: localStorage.getItem('my-scheduler-lastname')
    }
    useEffect(updateTimer, [])  // Update timer at entries
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
            <DashboardContext.Provider value={{tasks, setTasks , viewController, setView, setDate, userInfo, setSortBy, selected, setSelected }}>
                <Header view = {view} date = {date} />
                <Sidebar />
                <Calendar date={date} sorter = {sorter[sortBy]} />
            </DashboardContext.Provider>
        </div>
    )
}
export default Dashboard