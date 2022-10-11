import React, {useContext} from 'react'
import {DashboardContext} from '../Dashboard'
import '../../../sidebar.css'

function Sidebar() {
    const { setView } = useContext(DashboardContext)
    
    return (
       

        <div className="nav">
           

            {/* <!-- Left-aligned --> */}
            <button onClick= {
            () => setView('test')
            }>Test</button>

            <button onClick={
                () => {
                    setView('year')
                }
            }>Year</button>

            <button onClick= {
                () => setView('week')
            }>Week</button>
            

            {/* <!-- Centered --> */}
            <div className="nav-centered">
                <span className="active">
                   2022
                </span>
            </div>

            {/* <!-- Right-aligned --> */}
            <div className="nav-right">
                <span>Lorem</span>
                <span>Lorem</span>
            </div>

    </div>

    )
}

export default Sidebar