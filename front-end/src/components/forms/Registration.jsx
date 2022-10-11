import React, { useState, useRef } from 'react'
import Axios from 'axios'
import { clearInputs } from './form-managing'

function Registration() {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm: ''
  })
  const [firstnameRef, lastnameRef, emailRef, passwordRef, confirmRef] = [useRef(), useRef(), useRef(), useRef(), useRef()]
  const [isShowing, setIsShowing] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false)
  const handleChange = (e) => {
    setInputs({
      ...inputs, [e.target.name]: e.target.value
    })
  }
  const register = async (e) => {
    e.preventDefault()
    if (inputs.password !== inputs.confirm) {
      setPasswordMatch(true)
      setTimeout(() => setPasswordMatch(false), 3000)
      return
    }
    try {
      const res = await Axios.post(`http://localhost:3001/user/create`, inputs)
      if (res.status == 201) {
        alert(`${inputs.email} added successfully to the database`)
        clearInputs(firstnameRef, lastnameRef, emailRef, passwordRef, confirmRef)
        setIsShowing(false)
      }
    }
    catch {
      
    }
    
  }
  return (
    <form onSubmit={ register }>
      <input type= 'text' name="firstname"  placeholder='Firstname' onChange = { handleChange } ref= { firstnameRef } required />
      <input type= 'text' name="lastname" placeholder='Lastname' onChange = { handleChange } ref= { lastnameRef } required />
      <input type= 'email' name="email" placeholder='E-mail' onChange = { handleChange } ref= { emailRef } required />
      <input type={isShowing? 'text': 'password'} name="password" placeholder='Password' onChange = { handleChange } ref= { passwordRef } required />
      <input type={isShowing? 'text': 'password'} name="confirm" placeholder='Confirm password...' onChange = { handleChange } ref= { passwordRef } required />
      <input type='checkbox' id= "password-chk" checked= { isShowing } value='show-password' onChange={() => {
          setIsShowing(!isShowing)
      }} />
      <label htmlFor= "password-chk">
          { isShowing && 'Hide' || 'Show' } password 
      </label><br />
      <button type="submit">REGISTER</button>
      {passwordMatch && <><br /><span className='error-message'>The provided passwords doesn't match</span></>}
    </form>
  )
}

export default Registration