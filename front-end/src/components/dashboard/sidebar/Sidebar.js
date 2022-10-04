import React, {useContext} from 'react'
import {DashboardContext} from '../Dashboard'

function Sidebar() {
    const { setView } = useContext(DashboardContext)
    
    return (
        <div className= "sidebar">
            <button onClick={
                () => {
                    setView('year')
                }
            }>Year</button>
            <button>Month</button>
            <button onClick= {
                () => setView('week')
            }>Week</button>
            <button>Day</button>
        </div>
    )
}

export default Sidebar