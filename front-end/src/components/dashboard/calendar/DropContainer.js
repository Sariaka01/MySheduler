import React from 'react'
import { useDrop } from 'react-dnd'
import Preview from './Preview'

function DropContainer({ tasks, onDrop }) {
    const [{ isOver }, drop] = useDrop({
        accept: 'task',
        drop: (item, monitor) => {
            onDrop(item)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    function generateChildren() {
        return tasks.map((task, i) => <Preview key={i} task={task} />)
    }
    return (
        <td ref={drop} className= { isOver? "drop-container-over": "drop-container" }>
            {tasks && generateChildren()}
        </td>
    )
    }

export default DropContainer