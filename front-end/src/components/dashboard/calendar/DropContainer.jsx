import React from 'react'
import { useDrop } from 'react-dnd'
import Preview from './Preview'

function DropContainer({ tasks, onDrop, date, isToday }) {
    const [{ isOver }, drop] = useDrop({
        accept: 'task',
        drop: (item, monitor) => {
            onDrop(item, monitor, date)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    function generateChildren() {
        return tasks.map((task, i) => <Preview key={i} task={task} />)
    }
    return (
        <td ref={drop} className= { `drop-container ${isOver? 'drop-container-over': ''} ${isToday? 'today': ''}` }>
            {tasks && generateChildren()}
        </td>
    )
    }

export default DropContainer