import React, {useContext} from 'react'
import { useNavigate } from 'react-router'
import {DashboardContext} from '../Dashboard'

function Sidebar() {
    const nav = useNavigate()
    const { setView } = useContext(DashboardContext)
    function logout() {
        localStorage.removeItem('token')
        nav('/')
    }
    return (
        <div id="sidebar-container">
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
            <button className='logout-btn' onClick = {logout}>Log out</button>
        </div>
    )
}

export default Sidebar