import React, { useState, useEffect, useContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend as Backend } from 'react-dnd-html5-backend'
import DropContainer from './DropContainer'
import { VIEWS, dateBelongsTo } from '../../utils/date'
import { LIST } from '../../../test/list'

function Calendar({ view }) {
    const [tasks, setTasks] = useState(LIST)
    const newView =  VIEWS[view]
    const onDrop = (item, _, date) => {
        setTasks(prev => {
            let newList = prev
                .filter(el => el.id != item.id)
                .concat(view != 'test'? { ...item, start: newView.setDate(item.start, date) }: { ...item, date })
            return newList
        })
    }

    function generateCalendar() {
        let rows = []
        let remainder = tasks
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
                for (let j = 1; j <= newView.list.length; j++) {
                    let dateLabel = `${i}-${j}` // Date, j-th element of the i-th row, i-1 because of the first row
                    let taskList= []
                    if (remainder.length) {
                        let newRemainder = []
                        for (let task of remainder) {
                            if (newView.belongsTo(task, dateLabel))
                                taskList.push(task)
                            else
                                newRemainder.push(task)
                        }
                        remainder= newRemainder
                    }
                    cols.push(<DropContainer key={`${dateLabel}`} tasks={ taskList } onDrop= {onDrop} date = {dateLabel} />)
                }
            }
            rows.push(<tr key= {`${i}`}>{cols}</tr>)    // -1 because of the first row
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