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
                    setView('year')
                }
            }>Yearly</button>
            <button onClick={
                () => {
                    setView('month')
                }
            }>Monthly</button>
            <button onClick= {
                () => setView('week')
            }>Weekly</button>
            <button onClick= {
                () => setView('day')
            }>Daily</button>
        </div>
    )
}

export default Sidebar