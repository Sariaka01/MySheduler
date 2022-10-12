import React, { useRef, useState } from 'react'
import Axios from 'axios'
import { clearInputs } from './form-managing'

function Login() {
    const [emailInput, passwordInput] = [useRef(null), useRef(null)]
    const [isShowing, setIsShowing] = useState(false)
    
    const [errorMessage, setErrorMessage] = useState('')
    const login = async (e) => {
        e.preventDefault()
        try {
            const res = await Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/login`, {
            email: emailInput.current.value,
            password: passwordInput.current.value
            })
            clearInputs(emailInput, passwordInput)
            setIsShowing(false)
            if (res.status == 200) {

            }
        }
        catch {
            setErrorMessage('Wrong email or password provided')
            setTimeout(() => setErrorMessage(''), 3000)
            clearInputs(passwordInput)
        }
    }
    return (
    <form onSubmit={ login }>
            <input type= 'email' placeholder='email' ref= { emailInput } required />
            <input type={isShowing? 'text': 'password'} placeholder='password' ref={ passwordInput } required />
            <input type='checkbox' id= "password-chk" checked= { isShowing } value='show-password' onChange={() => {
                setIsShowing(!isShowing)
            }} />
            <label htmlFor= "password-chk">
                { isShowing && 'Hide' || 'Show' } password 
            </label><br />
            <button type='submit'>LOGIN</button>
            {errorMessage && <><br /><span className='error-message'>{ errorMessage }</span></>}
    </form>
    )
}

export default Login