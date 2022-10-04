import React, {useState, useEffect} from 'react'
import Row from './Row'
import {LIST} from '../../test/list'

const MONTHS= [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

function Calendar() {
    const [view, setView]= useState('year')

    function generateRows(view) {
        let rows= []
        switch (view) {
            default:
                for (let month of MONTHS) {
                    rows.push(<Row name={month} tasks={LIST} />)
                }
        }
        return rows
    }

    useEffect(() => {
        let _rows= []
        generateRows(view)
    }, [view])


    return (
        <table className="table">
            <tbody>
                <tr>
                    {generateRows()}
                </tr>
            </tbody>
        </table>
    )
}

export default Calendar