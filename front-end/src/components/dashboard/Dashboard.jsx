import React, {createContext, useState} from 'react'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'
import './table.css'

export const DashboardContext= createContext()

function Dashboard() {
    const [view, setView] = useState('test')
    const [date, setDate] = useState(new Date().toISOString())  // Manipulate the date in ISO format
    return (
        <div id="dashboard">
            <DashboardContext.Provider value={{ setView }}>
                <Sidebar />
                <Calendar view={view} date= {date} />
            </DashboardContext.Provider>
        </div>
    )
}
export default Dashboard