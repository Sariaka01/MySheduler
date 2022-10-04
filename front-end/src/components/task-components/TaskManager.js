import React from 'react'
import {useParams} from 'react-router-dom'
import {LIST} from '../../test/list'


function TaskManager() {
    let params= useParams()
    let task= LIST[params.id]

    function generateList(participants){
        return <ul>
            {participants.map(participant => <li>{participant}</li>)}
        </ul>
    }

    return (
    <div>
        <h1>{task.name}</h1>
        By <span><h3>{task.creator}</h3></span> 
        Start Date: {task.start}
        End Date: {task.end}
        <span>{task.description}</span>
        {generateList(task.participants)}
    </div>
  )
}

export default TaskManager