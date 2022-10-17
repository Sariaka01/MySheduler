import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskManager from './components/task-components/TaskManager'
import Dashboard from './components/dashboard/Dashboard'
import UserForm from './components/forms/UserForm'
import { getWeek } from './components/utils/date'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={ <UserForm /> } />
<<<<<<< Updated upstream
          <Route path= 'dashboard' element= {<Dashboard />}/>
=======
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='task' element={ <TaskManager /> } />
>>>>>>> Stashed changes
          <Route path= 'task/:id' element= {<TaskManager />}/>
        </Route>
      <Route path='*' element={ <h1>Error 404: Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
