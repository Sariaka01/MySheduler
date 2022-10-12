import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'
// import './user-form.css'
import './user-form.css'

function UserForm() {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div className="container-login">
            
            <div className="wrap-login">
            <div className="choice">
                <button className="btn-choice" onClick = {() => setIsLogin(true)}>LOGIN</button>
                <button className="btn-choice" onClick = {() => setIsLogin(false)}>REGISTER</button>
            </div>
                {isLogin && <Login /> || <Registration />}
            </div>
        </div>
    )
}

export default UserForm