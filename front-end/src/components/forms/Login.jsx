import React, { useRef, useState } from 'react'
import Axios from 'axios'
import { clearInputs } from './form-managing'

function Login() {
    const [emailInput, passwordInput] = [useRef(null), useRef(null)]
    const [isShowing, setIsShowing] = useState(false)
    const login = async (e) => {
        e.preventDefault()
        const res = await Axios.post(`http://localhost:3001/user/login`, {
            email: emailInput.current.value,
            password: passwordInput.current.value
        })
        clearInputs(emailInput, passwordInput)
        setIsShowing(false)
        console.log(res)
    }
    return (
    <form onSubmit={ login }>
            <input type= 'email' placeholder='email' ref= { emailInput } />
            <input type={isShowing? 'text': 'password'} placeholder='password' ref={ passwordInput } />
            <input type='checkbox' id= "password-chk" checked= { isShowing } value='show-password' onChange={() => {
                setIsShowing(!isShowing)
            }} />
            <label htmlFor= "password-chk">
                { isShowing && 'Hide' || 'Show' } password 
            </label><br />
            <button type='submit'>LOGIN</button>
    </form>
    )
}

export default Login