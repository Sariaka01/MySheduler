import React from 'react'
import { useDrop } from 'react-dnd'


function DropContainer({ children }) {
    function generateChildren() {
        return children? children: <></>
    }
    return (
        <tr className= {"drop-container"}>
            {generateChildren()}
        </tr>
    )
    }

export default DropContainer