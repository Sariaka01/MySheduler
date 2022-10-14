import React, { useState, useRef } from 'react'

function ParticipantTable({ participants, inputRef, handler }) {
	console.log(participants)
	// console.log('Participants loading')
	const [adderOn, setAdder] = useState(false)
	// const emailInput = useRef(null)
	const [list, setList] = useState(participants)
	// console.log(list)
	const [newEmail, setNewEmail] = useState('')
	let row = []
	if (participants.length) {
		// console.log(participants)
		let i= 0
		for (let participant of participants) {
			row.push(<tr key={i++}>
				<td>{participant}</td>
				<td>
					<button>Edit</button>
					<button>Remove</button>
				</td>
			</tr>)
		}
	}
	function showAdder(e) {
		e.preventDefault()
		setAdder(true)
		setTimeout(() => {
			inputRef.current.focus()
		}, 100)
	}
	function add(e) {
		e.preventDefault()
		setList(prev => {
			console.log(prev)
			return [newEmail]
		})
		setAdder(false)
	}
	return (
		<table>
			<thead>
				<tr>
					<th>Participants List</th>
					<td>
						{!adderOn && <button onClick={showAdder}>Add</button>}
					</td>
				</tr>
			</thead>
			<tbody>
				{adderOn && <tr>
					<td>
						<input ref= {inputRef} type = "email" />
					</td>
					<td colSpan={2}>
						<button onClick={(e) => {
							setAdder(false)
							handler(e)
							inputRef.current.value = ''
						} }>Add</button>
					</td>
				</tr>}
				{row}
			</tbody>
		</table>
  )
}

export default ParticipantTable