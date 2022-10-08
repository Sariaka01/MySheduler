import React, { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend as Backend } from 'react-dnd-html5-backend'
import Column from './Column'
import {LIST} from '../../../test/list'

const VIEWS = {
    year: {
        list: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        rowNumber: 31   // Per month view
    },
    month: {
        list: function (name) { 
            console.log(this)
            const index = [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ].indexOf(name)
            return [index]
        }(),
        rowNumber: 24   // Per month view
    },
    week: {
        list: [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        rowNumber: 24   // Per hour
    },
    day: {
        list: [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        rowNumber: 24   // Per hour
    },
    test: {
        list: [
            "Today", "Tomorrow"
        ],
        rowNumber: 5
    }
}

function Calendar({ view }) {
    //const [view, setView] = useState('year')
    function generateColumns() {
        let rows = []
        let i = 0
        const newView = VIEWS[view]
        for (let name of newView.list) {
            rows.push(<Column key={i++} name={name} tasks={LIST} rowNumber= {newView.rowNumber} />)
        }
        return rows
    }

    /*useEffect(() => {
        let _rows = []
        generateColumns(view)
    }, [view])*/


    return (
        <div id="calendar">
            { generateColumns() }
        </div>
    )
}

export default Calendar