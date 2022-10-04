import React from 'react'
import Preview from './Preview'

function Row({ name, tasks }) {
    let taskList = []
    let i= 0
    for (let task of tasks) {
        taskList.push(<Preview key={i++} task= {task}/>)
    }
  return (
    <td>
        <table>
            <thead>
                <tr>
                    <td>{name}</td>
                </tr>
            </thead>
            <tbody>
                {taskList}
            </tbody>
        </table> {/* END THEAD */}
    </td>
  )
}

export default Row