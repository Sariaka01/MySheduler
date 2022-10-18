import React, { useState, useContext } from 'react'
import { VIEWS } from '../../utils/date'

function Header({ view, date, setDate }) {
    const [title, setTitle] = useState(VIEWS[view].getTitle(date))
    function handleDate(handler) {
        switch (view) {
            case 'yearly':
                // Decrement the year
                const newDate = handler(date)
                setTitle(handler(date))
                setDate(new Date(date.getFullYear()-1, 0))
                break
            default: 
        }
    }
    function decrement() {
        const newDate = VIEWS[view].previous(date)
        setDate(newDate)
        setTitle(VIEWS[view].getTitle(newDate))
    }
    function increment() {
        const newDate = VIEWS[view].next(date)
        setDate(newDate)
        setTitle(VIEWS[view].getTitle(newDate))
    }
    return (
        <header>
            <button onClick = {decrement}>{"<"}</button>
            <h4>{ title }</h4>
            <button onClick = {increment}>{">"}</button>
        </header>
)}

export default Header