import React, { useContext } from 'react'
import { DashboardContext } from '../Dashboard';

function SortOptionSelector() {
    const { setSortBy } = useContext(DashboardContext);
    return (
// <<<<<<< HEAD
//         <select defaultValue = "priority" id="sort-select" onChange={(e) => {
//             setSortBy(e.target.value)
//         }}>
//             <option value="priority">Priority</option>
//             <option value="start">Start Date</option>
//             <option value="end">End Date</option>
//             <option value="creator">Creator</option>
//             <option value="name">Task name</option>
//         </select>
// =======
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
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
    )
}

export default SortOptionSelector