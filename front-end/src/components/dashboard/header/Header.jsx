import React, { useState, useContext } from 'react'
import { VIEWS } from '../../utils/date'
import { DashboardContext } from '../Dashboard'

function Header({ view, date }) {
    const { setDate } =  useContext(DashboardContext)
    const [title, setTitle] = useState(VIEWS[view].getTitle(date))
    function decrement() {
        switch (view) {
            case 'year':
                // Decrement the year
                const newDate = new Date(date.getFullYear() - 1, 0)
                setTitle(new Date(date.getFullYear()-1, 0).toLocaleDateString())
                setDate(new Date(date.getFullYear()-1, 0))
                break
            default:
                
        }
    }
    function increment() {
        setTitle(VIEWS[view].next(date))
    }
    return (
        <header>
            <button onClick = {decrement}>{"<"}</button>
            <h4>{ title }</h4>
            <button onClick = {increment}>{">"}</button>
        </header>
)}

export default Header