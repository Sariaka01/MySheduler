import React from 'react'
import TaskManager from '../task-components/TaskManager'
import {Link} from 'react-router-dom'

function Preview({ task }) {
  return (
    <tr>
      <td>
        <Link to= {`/task/${task.id}`} >
            Name: {task.name}
            Creator: {task.creator}
            Start: {task.start}
            End: {task.end}
          </Link>
        </td>
    </tr>
  )
}

export default Preview