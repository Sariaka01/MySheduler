import React, {createContext, useState} from 'react'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'
import './table.css'

export const DashboardContext= createContext()

function Dashboard() {
    const [view, setView] = useState('year')
    const [year, setYear] = useState(new Date().getFullYear())
    return (
        <div id="dashboard">
            <DashboardContext.Provider value={{ setView }}>
                <Sidebar />
                <Calendar view={view} year= {year} />
            </DashboardContext.Provider>
        </div>
    )
}
export default Dashboard