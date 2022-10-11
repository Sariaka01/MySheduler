import React, { useState } from 'react'
import Axios from 'axios'


function Registration() {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm: ''
  })
  const [isShowing, setIsShowing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const handleErrors = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(''), 3000)
  }
  const handleChange = (e) => {
    setInputs({
      ...inputs, [e.target.name]: e.target.value
    })
  }

  const register = async (e) => {
    e.preventDefault()
    if (inputs.password !== inputs.confirm) {
      handleErrors('The provided passwords doesn\'t match')
      return
    }
    try {
      const res = await Axios.post(`http://localhost:3001/user/create`, inputs)
      if (res.status == 201) {
        alert(`${inputs.email} added successfully to the database`)
        setInputs({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirm: ''
        })
        setIsShowing(false)
      }
    }
    catch({ response }) {
      switch (response.status) {
        case 400:
          handleErrors('The email is already registered')
          break
        default:
          return
      }
    }
    
  }
  return (
    <form onSubmit={ register }>
      <input type= 'text' name="firstname" value= {inputs.firstname}  placeholder='Firstname' onChange = { handleChange } required />
      <input type= 'text' name="lastname" value= {inputs.lastname} placeholder='Lastname' onChange = { handleChange } required />
      <input type= 'email' name="email" value= {inputs.email} placeholder='E-mail' onChange = { handleChange } required />
      <input type={isShowing? 'text': 'password'} value= {inputs.password} name="password" placeholder='Password' onChange = { handleChange } required />
      <input type={isShowing? 'text': 'password'} value= {inputs.confirm} name="confirm" placeholder='Confirm password...' onChange = { handleChange } required />
      <input type='checkbox' id= "password-chk" checked= { isShowing } value='show-password' onChange={() => {
          setIsShowing(!isShowing)
      }} />
      <label htmlFor= "password-chk">
          { isShowing && 'Hide' || 'Show' } password 
      </label><br />
      <button type="submit">REGISTER</button>
      {errorMessage && <><br /><span className='error-message'>{ errorMessage }</span></>}
    </form>
  )
}

export default Registration