import React, { useState } from 'react'
import DropContainer from './DropContainer'
import Preview from './Preview'

function Column({ name, tasks, rowNumber }) {
    const [taskList, setTaskList] = useState(tasks)
    function generateRows() {
        let rows= []
        for (let i = 0; i < rowNumber; i++) {
            // Filter the tasks
            let el = i<4? <DropContainer key= {i} tasks={[tasks[i%4]]} />: <DropContainer key= {i} />
            rows.push(el)
        }
        return rows
    }
    return (
        <table className= "column">
            <thead>
                <tr>
                    <th>{ name }</th>
                </tr>
            </thead>
            <tbody>
                { generateRows() }
            </tbody>
        </table>
    )
}

export default Column