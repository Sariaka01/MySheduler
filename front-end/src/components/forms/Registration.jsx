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

  const [visible, setVisible] = useState(false)
  const icon = visible? "fa fa-eye-slash": "fa fa-eye"
  const inputType = visible? "text":"password"

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
      const res = await Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/user/create`, inputs)
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
    <form className="login-form " onSubmit={ register } >
        
        <span className="login-form-title">
            Register
        </span>

        <div className="wrap-input " >
          <input className="input" type= 'text' name="firstname" value= {inputs.firstname}  placeholder='Firstname' onChange = { handleChange } required />
        </div>

        <div className="wrap-input " >
          <input className="input" type="text" name="lastname" value= {inputs.lastname} placeholder='Lastname' onChange = { handleChange } required />
        </div>

        <div className="wrap-input " >
          <input className="input" type= 'email' name="email" value= {inputs.email} placeholder='E-mail' onChange = { handleChange } required />
        </div>

        <div className="wrap-input " >
          <input className="input"  type={inputType} value= {inputs.password} name="password" placeholder='Password' onChange = { handleChange } required/>
          <span className="toggle-icon">
            <i className={icon} aria-hidden="true" onClick={()=> setVisible(visible=> !visible)}></i>
          </span>    
        </div>

        <div className="wrap-input " >
          <input className="input" type={ inputType } value= {inputs.confirm} name="confirm" placeholder='Confirm password...' onChange = { handleChange } required />
          <span className="toggle-icon">
            <i className={icon} aria-hidden="true" onClick={()=> setVisible(visible=> !visible)}></i>
          </span>
        </div>

        <div className="container-btn">
          <input type="submit" className="btn" value="Register" />      
        </div>
        {errorMessage && <><br /><span className='error-message'>{ errorMessage }</span></>}


    </form>
  )
}

export default Registration