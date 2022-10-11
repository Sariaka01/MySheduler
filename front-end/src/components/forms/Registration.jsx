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
    console.log(inputs)
  }
  const register = async (e) => {
    e.preventDefault()
    const res= await Axios.post(`http://localhost:3001/user/create`, inputs)
  }
  return (
    <form onSubmit={ register }>
      <input type= 'text' name="firstname"  placeholder='Firstname' onChange = { handleChange } />
      <input type= 'text' name="lastname" placeholder='Lastname' onChange = { handleChange } />
      <input type= 'email' name="email" placeholder='E-mail' onChange = { handleChange } />
      <input type={!isShowing? 'text': 'password'} name="password" placeholder='Password' onChange = { handleChange } />
      <button type= "submit">REGISTER</button>
    </form>
  )
}

export default Registration