import React, { useState, useContext } from 'react'
import Participant from './Participant'
import { ParticipantsContext } from './TaskManager'


function ParticipantTable({ participants, participates, readOnly }) {
	console.log(participants)
	// console.log('Participants loading')
	const [addButton, setAddButton] = useState(true)
	const [createMode, setCreateMode] = useState(false)
	const userEmail = localStorage.getItem('my-scheduler-email')
	const { handleParticipants } = useContext(ParticipantsContext)
	// const emailInput = useRef(null)
	/*const [list, setList] = useState(participants)
	// console.log(list)
	const [newEmail, setNewEmail] = useState('')*/
	let row = []
	if (participants.length) {
		// console.log(participants)
		let i= 0
		for (let participant of participants) {
			{
				userEmail != participant &&
				row.push(<Participant key={i++} participant={participant} createMode={false} adderHandler={setAdder} readOnly={readOnly} />)
			}
		}
	}
	function setAdder(button, create) {
		setAddButton(button)
		setCreateMode(create)
	}
	/*function add(e) {
		e.preventDefault()
		setList(prev => {
			console.log(prev)
			return [newEmail]
		})
		setAdder(false)
	}*/
	return (
		<>
			<div>
				<label htmlFor="participate">Participate to this task: </label>
				<input checked = {participates} id = "participate" type="checkbox" onChange={(e) => {
					if (e.target.checked) {
						handleParticipants(userEmail)
						// setParticipates(true)
					}
					else {
						handleParticipants('', userEmail)
						// setParticipates(false)
					}
				}} />
			</div>
			<table className="participant-list">
				<thead>
					<tr>
						<th >Participants List</th>
						<td >
							{!readOnly && addButton && <button className="btn-par add" onClick={(e) => {
								e.preventDefault()
								setAdder(false, true)
							}}><i className="fa fa-plus"></i></button>}
						</td>
					</tr>
				</thead>
				<tbody >
					{createMode && <Participant createMode = { true } adderHandler = { setAdder } readOnly = { readOnly } />}
					<div >
						{row}
					</div>
				</tbody>
			</table>
		</>
  )
}

export default ParticipantTable