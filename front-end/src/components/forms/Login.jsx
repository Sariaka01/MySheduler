import React, { useRef, useState } from 'react'
import Axios from 'axios'
import { clearInputs } from './form-managing'
import { useNavigate } from 'react-router-dom'

function Login() {
    const nav = useNavigate()
    const [emailInput, passwordInput] = [useRef(null), useRef(null)]
    const [isShowing, setIsShowing] = useState(false)

    const [visible, setVisible] = useState(false)
    const icon = visible? "fa fa-eye-slash": "fa fa-eye"
    const inputType = visible? "text":"password"
    
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
            console.log(res.status)
            if (res.status == 200) {
                localStorage.setItem('my-scheduler-token', res.data.user.token)
                localStorage.setItem('my-scheduler-email', res.data.user.email)
                localStorage.setItem('my-scheduler-firstname', res.data.user.firstname)
                localStorage.setItem('my-scheduler-lastname', res.data.user.lastname)
                // console.log(res.data.user)
                nav('dashboard')
            }
        }
        catch {
            setErrorMessage('Wrong email or password provided')
            setTimeout(() => setErrorMessage(''), 3000)
            clearInputs(passwordInput)
        }
    }
    return (
        <form className="login-form " onSubmit={ login } >
            <span className="login-form-title">
            Login
            </span>

            <div className="wrap-input " >
                <input className="input" type= 'email' placeholder='E-mail' ref= { emailInput } required />
            </div>

            <div className="wrap-input " >
                <input className="input"  type={inputType} placeholder='Password' ref={ passwordInput } required/>
                <span className="toggle-icon">
                    <i className={icon} aria-hidden="true" onClick={()=> setVisible(visible=> !visible)}></i>
                </span>
            </div>

            <div className="container-btn">
                <input type="submit" className="btn" value="Login " />      
            </div>
        
            {errorMessage && <><br /><span className='error-message'>{ errorMessage }</span></>}


    </form>
    )
}

export default Login