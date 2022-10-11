import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskManager from './components/task-components/TaskManager'
import Dashboard from './components/dashboard/Dashboard'
import UserForm from './components/forms/UserForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user" element={<UserForm />}>
          <Route path= "dashboard" element= {<h1>Dashboard</h1>}/>
          <Route path= "task/:id" element= {<TaskManager />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
