import React, {createContext, useState} from 'react'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'
import './table.css'

export const DashboardContext= createContext()

function Dashboard() {
    const [view, setView] = useState('weekly')
    return (
        <div id="dashboard">
            <DashboardContext.Provider value={{ setView }}>
                <Sidebar />
                <Calendar view={view} />
            </DashboardContext.Provider>
        </div>
    )
}
export default Dashboard