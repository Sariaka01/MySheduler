import React, { useState, useLayoutEffect, useContext, useTransition, useCallback, startTransition } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend as Backend } from 'react-dnd-html5-backend'
import Axios from 'axios'
import { VIEWS, dateBelongsTo, getWeek, getLocaleDateTime } from '../../utils/date'
import { LIST } from '../../../test/list'
import { DashboardContext } from '../Dashboard'
import DropContainer from './DropContainer'
import Loader from './Loader'

function Calendar({ view, date, sorter }) {
    const [isPending, startTransition] = useTransition()
    const { viewController, userInfo, tasks, setTasks } = useContext(DashboardContext)
    useLayoutEffect(() => {
        startTransition(() => {
            const [lower, upper] = viewController.getLimits(date)
            Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/list`, {
                token: userInfo.token,
                start: lower.toISOString(),
                end: upper.toISOString(),
                // year: date.getUTCFullYear() // Dates are stored in UTC
            }).then((res) => {
                setTasks(res.data)
                // console.log(res.data)
            }).catch((e) => {
                console.log(e)
            })
        })
        
        // console.log('Layout effect' + date)
        // console.log(date)
        /*let newTasks = LIST.filter(task => {
            let start = new Date(task.start)
            return start >= lower && start <= upper
        })
        // console.log(newTasks)
        setTasks(newTasks)*/
    }, [date])

    function onDrop(item, monitor, date) {
        if (userInfo.email != item.creator.email) {
            alert("You can't modify this task")
            return
        }
        const [prev, next] = [new Date(item.start), new Date(date)]
        let newItem = { ...item, start: viewController.setDate(prev, next) }
        setTasks(previous => previous
            .filter(task => task["task_id"] != item["task_id"])
            .concat(newItem)
        )
        /*console.log({
                ...newItem,
                participants: newItem.participants.map(user => user.email)
            })*/
        Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/tasks/update`, {
            token: userInfo.token,
            taskId: item["task_id"],
            data: {
                ...newItem,
                participants: newItem.participants.map(user => user.email)
            }
        }).then(e => {
        }).catch(e => {
            console.log(e)
        })
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
                cols.push(...list.map(el => <td key={`${el}`} className="title"><h3>{el}</h3></td>))
            }
            else {
                // Row numbers
                cols.push(<td key={`row-number-${i}`} className="row-number drop-container"><h3>{i}</h3></td>)
                for (let j = 1; j < list.length; j ++) {
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
                    cols.push(<DropContainer isToday={viewController.isToday(i, j, date)} tasks= {previewTask.sort(sorter)} key={`${i}-${j}`} date = {viewController.getDate(i, j, date)} onDrop = {onDrop} />)
                }
            }
            rows.push(<tr key= {`${i}`}>{cols}</tr>)    // -1 because of the first row
        }
        return rows
    }

    return (
        <div id="calendar-container">
            <DndProvider backend={Backend}>
                {/* {isPending && <Loading />} */}
                {isPending && <Loader />}
                <h1>{view}</h1>
                <table id = "calendar" cellSpacing = {0}>
                    <tbody>
                        { generateCalendar() }
                    </tbody>
                </table>
            </DndProvider>
        </div>
    )
}

export default Calendar