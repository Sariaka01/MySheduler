import React, { useContext } from 'react'
import { DashboardContext } from '../Dashboard';

function SortOptionSelector() {
    const { setSortBy } = useContext(DashboardContext);
    return (
        // <select defaultValue = "priority" id="sort-select" onChange={(e) => {
        //     setSortBy(e.target.value)
        // }}>
        //     <option value="priority">Priority</option>
        //     <option value="start">Start Date</option>
        //     <option value="end">End Date</option>
        //     <option value="creator">Creator</option>
        //     <option value="name">Task name</option>
        // </select>

        // <div className="wrap-input">
            <select className="classic input" defaultValue = "priority" id="sort-select" onChange={(e) => {
                setSortBy(e.target.value)
            }}>
                <option value="priority">Priority</option>
                <option value="start">Start Date</option>
                <option value="end">End Date</option>
                <option value="creator">Creator</option>
                <option value="name">Task name</option>
            </select>
            
        // </div>
    )
}

export default SortOptionSelector