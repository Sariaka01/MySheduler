import React, { useContext, useState, useEffect } from 'react'
import { useCallback } from 'react';
import { DashboardContext } from '../Dashboard'

function Header({ view, date }) {
    const { viewController, setDate } = useContext(DashboardContext)
    const [title, setTitle] = useState(viewController.getTitle(date))
    useEffect(() => {
        // console.log('Setting title for date ' + date)
        setTitle(viewController.getTitle(date))
    }, [date, view]);
    function increment(e) {
        e.preventDefault()
        setDate(viewController.next(date))
    }
    function decrement(e) {
        e.preventDefault()
        setDate(viewController.previous(date))
    }
    return (
        <div id= "header-container">
            <button onClick = { decrement }>Previous</button>
            <h3>{ title }</h3>
            <button onClick = { increment }>Next</button>
        </div>
    )
}

export default Header