import React, { createContext, useState, useEffect } from 'react'
import Header from './header/Header'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'
import TaskManager from '../forms/TaskManager'
import { VIEWS } from '../utils/date'
import './dashboard.css'

export const DashboardContext= createContext()

function Dashboard() {
    const [view, setView] = useState('yearly')
    const [viewController, setViewController] = useState(VIEWS[view])
    const [date, setDate] = useState(VIEWS[view].set(new Date(2022, 5, 20)))
    const userInfo = {
        token: localStorage.getItem('my-scheduler-token'),
        email: localStorage.getItem('my-scheduler-email'),
        firstname: localStorage.getItem('my-scheduler-firstname'),
        lastname: localStorage.getItem('my-scheduler-lastname')
    }
    console.log(userInfo)
    useEffect(() => {
        // console.log('effect')
        setViewController(VIEWS[view])
        setDate(VIEWS[view].set(date))
        // console.log(date)
    }, [view])
    return (
        <div id="dashboard">
            <DashboardContext.Provider value={{viewController, setView, setDate, userInfo }}>
                <Header view = {view} date = {date} />
                <Sidebar />
                <Calendar date={date} />
            </DashboardContext.Provider>
        </div>
    )
}
export default Dashboard