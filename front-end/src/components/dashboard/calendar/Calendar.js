import React, {useState, useEffect} from 'react'
import Row from './Row'
import {LIST} from '../../../test/list'

const VIEWS = {
    year: [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ],
    week: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ]
}

function Calendar({ view }) {
    //const [view, setView] = useState('year')
    
    function generateRows(view) {
        let rows = []
        let i= 0
        for (let name of VIEWS[view]) {
            rows.push(<Row key={i++} name={name} tasks={LIST} />)
        }
        return rows
    }

    /*useEffect(() => {
        let _rows = []
        generateRows(view)
    }, [view])*/


    return (
        <table className= "table" cellSpacing={0}>
            <tbody>
                <tr>
                    {generateRows(view)}
                </tr>
            </tbody>
        </table>
    )
}

export default Calendar