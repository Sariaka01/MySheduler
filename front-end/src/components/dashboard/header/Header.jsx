import React, { useContext, useState, useEffect } from 'react'
import { useCallback } from 'react';
import { DashboardContext } from '../Dashboard'

function Header({ view, date }) {
    const { viewController, setDate, userInfo, setSortBy } = useContext(DashboardContext)
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
        <div id="header-container">
            <label htmlFor = "sort-select">Sort by: </label>
            <select defaultValue = "priority" id="sort-select" onChange={(e) => {
                setSortBy(e.target.value)
            }}>
                <option value="priority">Priority</option>
                <option value="start">Start Date</option>
                <option value="end">End Date</option>
                <option value="creator">Creator</option>
                <option value="name">Task name</option>
            </select>
            <h3>{ `${userInfo.firstname} ${userInfo.lastname}` }</h3>
            <button onClick = { decrement }>Previous</button>
            <h2>{ title }</h2>
            <button onClick = { increment }>Next</button>
        </div>
    )
}

export default Header