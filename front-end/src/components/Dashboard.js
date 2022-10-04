import React, {useState} from 'react'
import Calendar from './calendar/Calendar'


function Dashboard() {
    const [view, setView]= useState('year')
    return (
        <div id="dashboard">
            <div className= "sidebar">
                <button onClick={
                    (e) => {
                        setView('year')
                        console.log(e)
                    }
                }>Year</button>
                <button>Month</button>
                <button onClick= {
                    () => setView('week')
                }>Week</button>
                <button>Day</button>
            </div>
            <Calendar view={view} />
        </div>
    )
}
export default Dashboard