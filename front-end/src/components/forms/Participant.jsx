import React, { useState, useContext, useRef } from 'react'
import { ParticipantsContext } from './TaskManager';

function Participant({ participant, createMode, adderHandler }) {
    const [editMode, setEditMode] = useState(createMode)
    const newParticipant = useRef()
    const { handleParticipants } = useContext(ParticipantsContext)
    const setFocus = () => {
        setTimeout(() => {
            try {
                newParticipant.current.focus()
                newParticipant.current.value = participant? participant: ''
            }
            catch {
                setFocus()
            }
        }, 100)
    }
    const setParticipants = (e) => {
        e.preventDefault()
        handleParticipants(newParticipant.current.value, participant)
        newParticipant.current.value = ''
        setEditMode(false)
        adderHandler(true, false) // To go out from adding elements
    }
    setFocus()
    return (
        <tr>
            <td>
                {editMode && <input type="email" ref={newParticipant} onKeyDown={
                    (e) => {
                        if (e.code == "Enter") {
                            setParticipants(e)
                        }
                    }
                } /> || <span>{participant}</span>}
            </td>
            <td colSpan={editMode ? 2 : 1}>
                {
                    editMode && <button onClick = {setParticipants}>Save
                    </button> ||
                    <>
                        <button onClick={(e) => {
                            e.preventDefault()
                            setEditMode(true)
                            setFocus()
                            adderHandler(false, false) // To go out from adding elements
                        }}>Edit</button>
                        <button onClick={(e) => {
                            e.preventDefault()
                            console.log('removing ' + participant)
                            handleParticipants('', participant)
                        }}>Remove</button>
                    </>
            }
            </td>
        </tr>
    )
}

export default Participant