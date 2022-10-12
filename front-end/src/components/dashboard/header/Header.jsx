import React, {useContext} from 'react'
import { DashboardContext } from '../Dashboard'

function Header() {
    const { year, setYear } = useContext(DashboardContext)
    console.log('Year from header = ' + year)
    function decrementYear() {
        setYear(year-1)
    }
    function incrementYear() {
        setYear(year+1)
    }
    console.log(year)
    return (
        <header>
            <button onClick = {decrementYear}>{"<"}</button>
            <h4>{ year }</h4>
            <button onClick = {incrementYear}>{">"}</button>
        </header>
)}

export default Header