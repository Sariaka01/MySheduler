import React, { useState, useContext } from 'react'
import Participant from './Participant'
import { ParticipantsContext } from './TaskManager'


function ParticipantTable({ participants, inputRef, handler }) {
	console.log(participants)
	// console.log('Participants loading')
	const [addButton, setAddButton] = useState(true)
	const [createMode, setCreateMode] = useState(false)
	// const emailInput = useRef(null)
	/*const [list, setList] = useState(participants)
	// console.log(list)
	const [newEmail, setNewEmail] = useState('')*/
	let row = []
	if (participants.length) {
		// console.log(participants)
		let i= 0
		for (let participant of participants) {
			row.push(<Participant key={ i++ } participant={participant} createMode= {false} adderHandler = { setAdder } />)
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
		<table>
			<thead>
				<tr>
					<th>Participants List</th>
					<td>
						{addButton && <button onClick={(e) => {
							e.preventDefault()
							setAdder(false, true)
						}}>Add</button>}
					</td>
				</tr>
			</thead>
			<tbody>
				{createMode && <Participant createMode = { true } adderHandler = { setAdder } />}
				{row}
			</tbody>
		</table>
  )
}

export default ParticipantTable