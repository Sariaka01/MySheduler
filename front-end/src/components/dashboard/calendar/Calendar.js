import React, { useState, useEffect, useContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend as Backend } from 'react-dnd-html5-backend'
import Column from './Column'
import { DashboardContext } from '../Dashboard'
import DropContainer from './DropContainer'
import { VIEWS } from './views'

function Calendar({ view }) {
    const { tasks } = useContext(DashboardContext)
    const [list, setList] = useState(tasks)
    /*function generateRowNumbers() {
        let rows = []
        let newView = VIEWS[view]
        for (let i = 1; i <= newView.rowNumber; i++) {
            rows.push(<tr key={i}>
                <td>
                    <h4>{i}</h4>
                </td>
            </tr>)
        }
        return <table><tbody>{rows}</tbody></table>
    }
    function generateColumns() {
        let rows = []
        let i = 0
        const newView = VIEWS[view]
        for (let name of newView.list) {
            // Filter the tasks
            rows.push(<td key={i++}><Column name={name} tasks={tasks} rowNumber= {newView.rowNumber} /></td>)
        }
        return rows
    }*/
    const onDrop = (item, monitor) => {
    }

    function generateCalendar() {
        const newView = VIEWS[view]
        let rows = []
        for (let i = 0; i <= newView.rowNumber; i ++) {
            // Row creation
            let cols = []
            if (i == 0) {
                // First row with the names
                cols.push(<td key={'nbsp'} className="row-number nbsp">&nbsp;</td>, ...newView.list.map(el => <td key={`${el}`} className = "title"><h3>{ el }</h3></td>))
            }
            else {
                cols.push(<td key={`row-number-${i}`} className="row-number drop-container"><h3>{i}</h3></td>)
                // Filter tasks
                for (let j = 0; j < newView.list.length; j++) {
                    let date = `${i}-${newView.list[j].toLowerCase()}` // Date
                    let taskList = tasks.filter(task => task.date == date)
                    cols.push(<DropContainer key={`${date}`} tasks={ taskList } onDrop= {onDrop} />)
                }
            }
            rows.push(<tr key= {`row-${i}`}>{cols}</tr>)
        }
        return rows
    }

    return (
        <DndProvider backend= {Backend}>
            <table id="calendar" cellSpacing = {0}>
                <tbody>
                    { generateCalendar() }
                </tbody>
            </table>
        </DndProvider>
    )
}

export default Calendar