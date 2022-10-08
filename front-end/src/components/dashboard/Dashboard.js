import React, {createContext, useState} from 'react'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'

export const DashboardContext= createContext()

function Dashboard() {
    const [view, setView]= useState('year')
    return (
        <div id="dashboard">
            <DashboardContext.Provider value={{ setView }}>
                <Sidebar />
            </DashboardContext.Provider>
            <Calendar view = {view} />
        </div>
    )
}
export default Dashboard