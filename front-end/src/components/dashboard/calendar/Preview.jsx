import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDrag, useDrop } from 'react-dnd'
import './calendar.css'

function Preview({ task }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { ...task }
  })
  /*const [, drop] = useDrop({
    accept: 'task',
    hover: (item, monitor) => {
      
    }
  })*/
  
  return (
    task &&
    <Link ref= { drag } className = {`preview ${task.priority.toLowerCase()}`} to= {`/task/${task['task_id']}`}>
      <div>
        <h3>{task.name}</h3>
        <span>{`${task.creator.firstname} ${task.creator.lastname}`}</span>
        <span>{new Date(task.start).toString().split('GMT')[0].trim().slice(0, -3)}</span>
        <span>{new Date(task.end).toString().split('GMT')[0].trim().slice(0, -3)}</span>
      </div>
    </Link>
    
  )
}
export default Preview