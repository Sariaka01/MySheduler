import React, { useState } from 'react'
import Axios from 'axios'

function Registration() {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })
  const [isShowing, setIsShowing] = useState(false)
  const handleChange = (e) => {
    setInputs({
      ...inputs, [e.target.name]: e.target.value
    })
  }
  const register = async (e) => {
    e.preventDefault()
    try {
      const res = await Axios.post(`http://localhost:3001/user/create`, inputs)
      if (res.status == 201) {
        alert(`${inputs.email} added successfully to the database`)
        setInputs(prev => ({
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        }))
      }
    }
    catch {
      
    }
    
  }
  return (
    <form onSubmit={ register }>
      <input type= 'text' name="firstname"  placeholder='Firstname' onChange = { handleChange } required />
      <input type= 'text' name="lastname" placeholder='Lastname' onChange = { handleChange } required />
      <input type= 'email' name="email" placeholder='E-mail' onChange = { handleChange } required />
      <input type={!isShowing? 'text': 'password'} name="password" placeholder='Password' onChange = { handleChange } required />
      <button type= "submit">REGISTER</button>
    </form>
  )
}

export default Registration