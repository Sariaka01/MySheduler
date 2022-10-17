import React, { useState, useEffect, useContext, useTransition } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend as Backend } from 'react-dnd-html5-backend'
import Axios from 'axios'
import { VIEWS, dateBelongsTo, getWeek, getLocaleDateTime } from '../../utils/date'
import { LIST } from '../../../test/list'
import { useLayoutEffect } from 'react'
import Header from '../header/Header'
import Preview from './Preview'

function Calendar({ view }) {
    // The date is UTC date (Date.now by default)
    const [date, setDate] = useState(VIEWS[view].set(new Date(2022, 0, 1)))
    const [tasks, setTasks] = useState([])
    const [year, setYear] = useState(date.getFullYear())
    // console.log(date, year)
    let rows = []
    /*switch (view) {
        case 'year':
            break
        case 'month':
            break
        case 'week': 
            break
        case 'day':
            break
    }*/
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
        console.log('Layout effect')
        setTasks(LIST)
    }, [year])

    useEffect(() => {
        generateCalendar()
    }, [view])
    function next() {

    }
    function previous() {

    }
    function generateCalendar() {
        let newView = VIEWS[view]
        let rows = []
        let remainingTasks = tasks  // To filter tasks
        const list = newView.getList(date)
        const { day, year, month, week, hour, min, sec } = getLocaleDateTime(date.toISOString())
        // console.log(day, month, year, hour, min, sec, week)
        // console.log(newView)
        for (let i = VIEWS[view].start - 1; i <= VIEWS[view].end; i ++) {
            // Row creation
            let cols = []
            if (i < VIEWS[view].start) {
                // First row with the names
                cols.push(<td key={'nbsp'+i} className="row-number nbsp">&nbsp;</td>, ...list.map(el => <td key={`${el}`} className="title"><h3>{el}</h3></td>))
            }
            else {
                // Row numbers
                cols.push(<td key={`row-number-${i}`} className="row-number drop-container"><h3>{i}</h3></td>)
                for (let j = 1; j <= list.length; j ++) {
                    // Push boxes
                    const key = newView.getLabel(i, j, { day, month, year, hour, min, sec, week })  // TO be managed in the date module
                    // Filter tasks
                    // console.log(key)
                    let previewTask = []
                    let newRemainder = []
                    if (remainingTasks.length) {
                        // console.log('Remaining: ', remainingTasks.length)
                        for (let task of remainingTasks) {
                        const taskStartDate = new Date(task.start)  // task.start is in ISO format
                        if (newView.belongsTo(taskStartDate, key))
                            previewTask.push(<div>{ taskStartDate.toLocaleString() }</div>)
                        else
                            newRemainder.push(task)
                        }
                        remainingTasks = newRemainder
                    }
                    cols.push(<td key={key}>{ previewTask }</td>)
                }
            }
            rows.push(<tr key= {`${i}`}>{cols}</tr>)    // -1 because of the first row
        }
        return rows
    }
    /*const generateCalendar = () => {
        return tasks.map((task, i) => <tr key={i}>
            <Preview task={ task } />
        </tr>)
    }*/

    /*const generateCalendar = () =>  {
        let rows = []
        let remainder = tasks*/
        /****************************** Date manipulation *****************************/
        /*const curDate = new Date().toISOString();
        let { year, month, day, hour } = getLocaleDateTime(curDate)
        const week = getWeek(curDate)
        console.log(year, month, day, hour, week)*/
        /***********************************************************************/
        /*for (let i = 0; i <= newView.rowNumber; i ++) {
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
                    let dateLabel = newView.getLabel(i, j, { hour, day, week, month, year }) // Date, j-th element of the i-th row, i-1 because of the first row
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
<<<<<<< Updated upstream
    }

    return (
        <DndProvider backend= {Backend}>
=======
    }*/
    // const [isPending, startTransition] = useTransition()
    // useEffect(() => startTransition(() => {
    //     for (let i = 0; i < 200000; i++){
    //         console.log(i)
    //     }
    // }),
    // [tasks])
    return (
        <DndProvider backend={Backend}>
            {/* {isPending && <Loading />} */}
            <h1>{view}</h1>
            <Header view = { view } date = { date } setYear = { setYear } setDate = { setDate } />
            <table id = "calendar" cellSpacing = {0}>
                <tbody>
                    { generateCalendar() }
                </tbody>
            </table>
        </DndProvider>
    )
}

export default Calendar