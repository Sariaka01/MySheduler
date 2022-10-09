import React, {createContext, useState} from 'react'
import Calendar from './calendar/Calendar'
import Sidebar from './sidebar/Sidebar'
import {LIST} from '../../test/list'

export const DashboardContext= createContext()

function Dashboard() {
    const [view, setView] = useState('test')
    const tasks = LIST
    return (
        <div id="dashboard">
            <DashboardContext.Provider value={{ setView, tasks }}>
                <Sidebar />
                <Calendar view={view} />
            </DashboardContext.Provider>
        </div>
    )
}
export default Dashboard