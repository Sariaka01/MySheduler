import React, { useState, useLayoutEffect, useContext, useTransition, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend as Backend } from 'react-dnd-html5-backend'
import Axios from 'axios'
import { VIEWS, dateBelongsTo, getWeek, getLocaleDateTime } from '../../utils/date'
import { LIST } from '../../../test/list'
import { DashboardContext } from '../Dashboard'
import DropContainer from './DropContainer'
import Preview from './Preview'

function Calendar({ view, date }) {
    const { viewController } = useContext(DashboardContext)
    const [tasks, setTasks] = useState([])
    useLayoutEffect(() => {
        /*Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/list`, {
            token: localStorage.getItem('token'),
            start: new Date(date.getFullYear()).toISOString(),
            end: new Date(date.getFullYear(), 11, 31).toISOString(),
            // year: date.getUTCFullYear() // Dates are stored in UTC
        }).then((res) => {
            setTasks(res.data)
            console.log(res.data)
        }).catch((e) => {
            console.log(e)
        })*/
        // console.log('Layout effect' + date)
        const [lower, upper] = viewController.getLimits(date)
        // console.log(date)
        let newTasks = LIST.filter(task => {
            let start = new Date(task.start)
            return start >= lower && start <= upper
        })
        // console.log(newTasks)
        setTasks(newTasks)
    }, [date])

    function onDrop(item, monitor, date) {
        const [prev, next] = [new Date(item.start), new Date(date)]
        setTasks(previous => previous
            .filter(task => task["task_id"] != item["task_id"])
            .concat({ ...item, start: viewController.setDate(prev, next) })
        )
    }
    function generateCalendar() {
        // console.log('Generating calendar')
        let rows = []
        let remainingTasks = tasks  // To filter tasks
        // console.log(date)
        const list = viewController.getList(date)  // List for columns
        const { day, year, month, week, hour, min, sec } = getLocaleDateTime(date.toISOString())
        // console.log(day, month, year, hour, min, sec, week)
        // console.log(viewController)
        for (let i = viewController.start - 1; i <= viewController.end; i++) {
            // Row creation
            let cols = []
            if (i < viewController.start) {
                // First row with the names
                cols.push(<td key={'nbsp'+i} className="row-number nbsp">&nbsp;</td>, ...list.map(el => <td key={`${el}`} className="title"><h3>{el}</h3></td>))
            }
            else {
                // Row numbers
                cols.push(<td key={`row-number-${i}`} className="row-number drop-container"><h3>{i}</h3></td>)
                for (let j = 1; j <= list.length; j ++) {
                    // Push boxes
                    // const key = viewController.getLabel(i, j, { day, month, year, hour, min, sec, week })  // TO be managed in the date module
                    // Filter tasks
                    // console.log(key)
                    let previewTask = []
                    let newRemainder = []
                    if (remainingTasks.length) {
                        // console.log('Remaining: ', remainingTasks.length)
                        for (let task of remainingTasks) {
                        const taskStartDate = new Date(task.start)  // task.start is in ISO format
                        if (viewController.belongsTo(taskStartDate, i, j))
                            previewTask.push(task)
                        else
                            newRemainder.push(task)
                        }
                        remainingTasks = newRemainder
                    }
                    cols.push(<DropContainer id={viewController.isToday(i, j, date) && "today" || undefined} tasks= {previewTask} key={`${i}-${j}`} date = {viewController.getDate(i, j, date)} onDrop = {onDrop} />)
                }
            }
            rows.push(<tr key= {`${i}`}>{cols}</tr>)    // -1 because of the first row
        }
        return rows
    }

    return (
        <DndProvider backend={Backend}>
            {/* {isPending && <Loading />} */}
            <h1>{view}</h1>
            <table id = "calendar" cellSpacing = {0}>
                <tbody>
                    { generateCalendar() }
                </tbody>
            </table>
        </DndProvider>
    )
}

export default Calendar