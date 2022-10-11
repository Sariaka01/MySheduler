import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskManager from './components/task-components/TaskManager'
import Dashboard from './components/dashboard/Dashboard'
import UserForm from './components/forms/UserForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element= {<Dashboard />}/>
        <Route path= "/user-auth" element= {<UserForm />}/>
        <Route path= "/task/:id" element= {<TaskManager />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
