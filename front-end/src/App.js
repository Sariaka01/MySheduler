import React, { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './table.css'
import Calendar from './components/calendar/Calendar'
import TaskManager from './components/task-components/TaskManager'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element= {
                                <div className="container">
                                  <Calendar/>
                                  <button>Année</button>
                                  <button>Mois</button>
                                  <button>Semaine</button>
                                  <button>Jour</button>
                                </div>
       }/>
       <Route path= "/task/:id" element= {
         <TaskManager />
       }/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
