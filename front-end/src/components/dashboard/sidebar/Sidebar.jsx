import React, {useContext} from 'react'
import {DashboardContext} from '../Dashboard'

function Sidebar() {
    const { setView } = useContext(DashboardContext)
    
    return (
        <div className="sidebar">
            {/* <button onClick= { */}
                {/* () => setView('test') */}
            {/* }>Test</button>*/}
            <button onClick={
                () => {
                    setView('yearly')
                }
            }>Yearly</button>
            <button onClick={
                () => {
                    setView('monthly')
                }
            }>Monthly</button>
            <button onClick= {
                () => setView('weekly')
            }>Weekly</button>
            <button onClick= {
                () => setView('daily')
            }>Daily</button>
        </div>
    )
}

export default Sidebar