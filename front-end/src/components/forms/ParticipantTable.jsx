import React, { useState, useContext } from 'react'
import Participant from './Participant'
import { ParticipantsContext } from './TaskManager'


// <<<<<<< HEAD
function ParticipantTable({ participants, participates, readOnly }) {
// =======
// function ParticipantTable({ participants, inputRef, handler }) {
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
	console.log(participants)
	// console.log('Participants loading')
	const [addButton, setAddButton] = useState(true)
	const [createMode, setCreateMode] = useState(false)
// <<<<<<< HEAD
	const userEmail = localStorage.getItem('my-scheduler-email')
	const { handleParticipants } = useContext(ParticipantsContext)
// =======
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
	// const emailInput = useRef(null)
	/*const [list, setList] = useState(participants)
	// console.log(list)
	const [newEmail, setNewEmail] = useState('')*/
	let row = []
	if (participants.length) {
		// console.log(participants)
		let i= 0
		for (let participant of participants) {
// <<<<<<< HEAD
			{
				userEmail != participant &&
				row.push(<Participant key={i++} participant={participant} createMode={false} adderHandler={setAdder} readOnly={readOnly} />)
			}
// =======
// 			row.push(<Participant key={ i++ } participant={participant} createMode= {false} adderHandler = { setAdder } />)
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
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
// <<<<<<< HEAD
		<div className = 'participants'>
			<div className = 'check-me'>
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
				<label htmlFor="participate" className = 'bold'>Participate to this task</label>
			</div>
			<table className = 'participant-table'>
				<thead>
					<tr>
						<td colSpan = {2} className = 'bold'>Participants List</td>
					{/* </tr>
					<tr> */}
						<td>
							{!readOnly && addButton && <button className = 'small-btn add-btn' onClick={(e) => {
								e.preventDefault()
								setAdder(false, true)
							}}>Add</button>}
						</td>
					</tr>
				</thead>
				<tbody>
					{createMode && <Participant createMode = { true } adderHandler = { setAdder } readOnly = { readOnly } />}
					{row}
				</tbody>
			</table>
		</div>
// =======
// 		<table>
// 			<thead>
// 				<tr>
// 					<th>Participants List</th>
// 					<td>
// 						{addButton && <button onClick={(e) => {
// 							e.preventDefault()
// 							setAdder(false, true)
// 						}}>Add</button>}
// 					</td>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{createMode && <Participant createMode = { true } adderHandler = { setAdder } />}
// 				{row}
// 			</tbody>
// 		</table>
// >>>>>>> eee9bf56966f676be9f4252c8536f223386ed6a2
  )
}

export default ParticipantTable