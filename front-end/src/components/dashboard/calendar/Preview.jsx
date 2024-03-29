import React, { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDrag, useDrop } from 'react-dnd'
import { DashboardContext } from '../Dashboard'
import './calendar.css'

function Preview({ task }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { ...task }
  })
  const { setSelected, userInfo } = useContext(DashboardContext);
  /*const [, drop] = useDrop({
    accept: 'task',
    hover: (item, monitor) => {
      
    }
  })*/
  function toggleSelection(e) {
    if (e.target.checked) {
      setSelected(selected => [...selected, task.task_id])
    }
    else {
      setSelected(selected => selected.filter(s => s != task.task_id))
    }
  }
  return (
    task &&
    
    <div ref={drag} className={`preview ${task.priority.toLowerCase()}`}>
      {userInfo.email == task.creator.email && <input type="checkbox" onChange={toggleSelection} />}
      <Link to={`/task/${task['task_id']}`}>
        <div>
          <h3>{task.name}</h3>
          <span>---***---</span>
          <h4>{`${task.creator.firstname} ${task.creator.lastname}`}</h4>
          <span>{new Date(task.start).toString().split('GMT')[0].trim().slice(0, -3)}</span>
          <span>{new Date(task.end).toString().split('GMT')[0].trim().slice(0, -3)}</span>
        </div>
      </Link>
    </div>
    
  )
}
export default Preview