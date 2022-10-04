import React from 'react'
import TaskManager from '../task-components/TaskManager'
import {Link} from 'react-router-dom'

function Preview({ task }) {
  return (
    <Link to= {`/task/${task.id}`} >
      <tr>
        <td>
            Name: {task.name}
            Creator: {task.creator}
            Start: {task.start}
            End: {task.end}
        </td>
      </tr>
    </Link>
  )
}

export default Preview