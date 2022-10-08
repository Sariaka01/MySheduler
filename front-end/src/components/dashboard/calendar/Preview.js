import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDrag, useDrop } from 'react-dnd'

function Preview({ task }) {

  return (
    <td>
      <Link className={'preview'} to= {`/${task.id}`}>
      <div>
        <span>Name: {task.name}</span>
        <span>Creator: {task.creator}</span>
        <span>Start: {task.start}</span>
        <span>End: {task.end}</span>
        </div>
      </Link>
    </td>
    
  )
}

export default Preview