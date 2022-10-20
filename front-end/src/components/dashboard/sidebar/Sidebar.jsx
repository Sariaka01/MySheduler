import React, {useContext} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
// <<<<<<< HEAD
import Axios from 'axios'
// =======
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
import {DashboardContext} from '../Dashboard'
import './sidebar.css'


function Sidebar() {
    const nav = useNavigate()
// <<<<<<< HEAD
    const { setView, selected, setSelected, setTasks } = useContext(DashboardContext)
// =======
//     const { setView } = useContext(DashboardContext)
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
    function logout() {
        localStorage.removeItem('my-scheduler-token')
        localStorage.removeItem('my-scheduler-email')
        localStorage.removeItem('my-scheduler-firstname')
        localStorage.removeItem('my-scheduler-lastname')
        nav('/')
    }
// <<<<<<< HEAD
    async function deleteTasks() {
        if (window.confirm('Remove the selected task(s)?')) {
            try {
                await Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/delete`, {
                    token: localStorage.getItem('my-scheduler-token'),
                    taskIdList: selected
                })
                setTasks(tasks => tasks.filter(task => !selected.includes(task.task_id)))
                setSelected([])
            }
            catch(e) {
                alert('Could\'t remove the tasks')
            }
        }
    }
// =======
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
    return (
        <div id="sidebar-container">
            {/* <button onClick= { */}
                {/* () => setView('test') */}
            {/* }>Test</button>*/}
            <button className='logout-btn' onClick={logout}><i className="fa fa-chevron-left"></i>
                &nbsp;Log out
            </button>
            {/* <button className='logout-btn' onClick={logout}>Log out</button> */}
{/* ======= */}
            <Link to='/task'>
                <button><i className="fa fa-plus"></i> Create</button>
            </Link>
            <button className={`last-btn ${selected.length == 0? 'hidden': ''}`} onClick={deleteTasks}>
                Delete
            </button>

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
{/* <<<<<<< HEAD
                <button>Create</button>
            </Link> */}
{/* >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2 */}
        </div>
    )
}

export default Sidebar