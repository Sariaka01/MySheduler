import React, {createContext, useState} from 'react'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'

export const DashboardContext= createContext()

function Dashboard() {
    const [view, setView] = useState('test')
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