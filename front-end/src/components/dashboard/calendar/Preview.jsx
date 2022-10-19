import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDrag, useDrop } from 'react-dnd'

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
    <Link ref= { drag } className={'preview'} to= {`/task/${task.id}`}>
      <div>
        {/* <span>Name: {task.name}</span> */}
        {/* <span>Creator: {task.creator}</span> */}
        <span>Start: {new Date(task.start).toLocaleString()}</span>
        {/* <span>End: {new Date(task.end).toLocaleString()}</span> */}
      </div>
    </Link>
    
  )
}
export default Preview