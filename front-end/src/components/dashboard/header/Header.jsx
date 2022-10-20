import React, { useContext, useState, useEffect } from 'react'
import { useCallback } from 'react';
import SortOptionSelector from './SortOptionSelector'
import { DashboardContext } from '../Dashboard'
import './header.css'
import { Link } from 'react-router-dom';
// <<<<<<< HEAD
// =======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2

function Header({ view, date }) {
    // console.log(date)
    const { viewController, setDate, userInfo } = useContext(DashboardContext)
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
{/* <<<<<<< HEAD
            <h3>{`${userInfo.firstname}'s Scheduler`}</h3>
            <div className="nav">
                <button onClick = { decrement }>Previous</button>
                <h3>{ title }</h3>
                <button onClick = { increment }>Next</button>
            </div>
            <div className="controller">
======= */}
            <h2>{`${userInfo.firstname}'s Scheduler`}</h2>
            <div className="nav">
                <button onClick = { decrement } className="btn-arrow"><i className="fa fa-chevron-left"></i></button>
                <h1>{ title }</h1>
                <button onClick = { increment } className="btn-arrow"><i className="fa fa-chevron-right"></i></button>
            </div>
            <div className="sort">
{/* >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2 */}
                <label htmlFor="sort-select">Sort by: </label>
                <SortOptionSelector />
                {/*<label htmlFor='go-to'>Go to: </label>
                <select defaultValue= {viewController.getTitle(date)}  id='go-to' onChange={(e) => {
                    setDate(viewController.goTo(e.target.value))
                }}>
                    {viewController.getPreviews(date).map(preview => {
                        let label = viewController.getTitle(preview)
                        return (<option value={label}>
                                {label}
                        </option>)
                    })}
                </select>*/}
            </div>
        </div>
    )
}

export default Header