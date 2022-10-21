import React, { useState, useContext, useRef } from 'react'
import { ParticipantsContext } from './TaskManager';

function Participant({ participant, createMode, adderHandler, readOnly }) {
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
                {editMode && <input type="email" className="input" ref={newParticipant} onKeyDown={
                    (e) => {
                        if (e.code == "Enter") {
                            setParticipants(e)
                        }
                    }
                } /> || <span>{participant}</span>}
            </td>
{/* <<<<<<< HEAD */}
            {!readOnly && <td colSpan={editMode ? 2 : 1}>
                {
                    editMode && <button className="btn-par save" onClick={setParticipants}>Save
                    </button> ||
                    <div className="btn-par-container">
                        <button className="btn-par edit" onClick={(e) => {
// =======
// {/* <<<<<<< HEAD */}
//             {!readOnly && ((editMode &&
//                 <td colSpan={editMode ? 2 : 1}>
//                     <button className='small-btn' onClick={setParticipants}>Save
//                     </button>
//                 </td>)
//                 ||
//                 <>
//                     <td>
//                         <button className='small-btn' onClick={(e) => {
// >>>>>>> 91923343e325e01086276d9d55e9ba42d1c28620
                            e.preventDefault()
                            setEditMode(true)
                            setFocus()
                            adderHandler(false, false) // To go out from adding elements
// <<<<<<< HEAD
                        }}><i className="fa fa-edit"></i></button>
                        <button className="btn-par del" onClick={(e) => {
                            e.preventDefault()
                            console.log('removing ' + participant)
                            handleParticipants('', participant)
                        }}><i className="fa fa-trash"></i></button>
                    </div>
                }
            </td>}
{/* =======
                        }}>Edit</button>
                    </td>
                    <td>
                        <button className='small-btn' onClick={(e) => {
                            e.preventDefault()
                            console.log('removing ' + participant)
                            handleParticipants('', participant)
                        }}>Remove</button>
                    </td>
                </>)
            }
>>>>>>> 91923343e325e01086276d9d55e9ba42d1c28620 */}
        </tr>
    )
}

export default Participant