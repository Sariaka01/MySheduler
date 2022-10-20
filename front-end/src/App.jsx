import React, { useState, createContext } from 'react'
import Axios from 'axios'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskManager from './components/forms/TaskManager'
import Dashboard from './components/dashboard/Dashboard'
import UserForm from './components/forms/UserForm'
import { getWeek } from './components/utils/date'

export const AppContext = createContext()

function App() {
  const [timers, setTimers] = useState([])

  function updateTimer() {
    console.log('Getting today\'s tasks...')
    const today = new Date()
    try {
      Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/list`, {
        token: localStorage.getItem('token'),
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999).toISOString(),
      }).then(res => {
          // Setting timers
        for (let timer of timers) {
          // Clear the previous one
          clearTimeout(timer)
        }
        let newtTimers = []
        for (let task of res.data) {
          console.log(new Date(task.start), new Date())
          const timer = new Date(task.start) - new Date() - task.beforeStart * 60 * 1000
          console.log(timer * 1000 * 60)
          if (timer > 0) {
            newtTimers.push(setTimeout(() => alert(`${task.name} starts in ${task.beforeStart} minutes`), timer))
          }
        }
        setTimers(newtTimers)
      })
    }
    catch {
      console.log('Failed to fetch tasks')
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
{/* <<<<<<< HEAD */}
          <Route index element={<UserForm />} />
          <Route path='dashboard' element={
            <AppContext.Provider value={{ updateTimer }}>
              <Dashboard />
              </AppContext.Provider>
            } />
          <Route path='task' element={
            <AppContext.Provider value={{ updateTimer }}>
              <TaskManager />
            </AppContext.Provider>
          } />
          <Route path='task/:id' element={
            <AppContext.Provider value={{ updateTimer }}>
              <TaskManager />
            </AppContext.Provider>
          }/>
{/* =======
          <Route index element={ <UserForm /> } />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='task' element={ <TaskManager /> } />
          <Route path= 'task/:id' element= {<TaskManager />}/>
>>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2 */}
        </Route>
      <Route path='*' element={ <h1>Error 404: Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
