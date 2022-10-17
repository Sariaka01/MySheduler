import React, {createContext, useState} from 'react'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import './table.css'

export const DashboardContext= createContext()

function Dashboard() {
    const [view, setView] = useState('year')
    const [date, setDate] = useState(new Date())
    return (
        <div id="dashboard">
            <DashboardContext.Provider value={{ setView, setDate }}>
                <Header view = { view } date = { date } />
                <Sidebar />
                <Calendar view={ view } date = { date } />
            </DashboardContext.Provider>
        </div>
    )
}
export default Dashboard