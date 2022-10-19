import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'
import './user-form.css'

function UserForm() {
    console.log('Rendering form')
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div>
            <div>
                <button onClick = {() => setIsLogin(true)}>LOGIN</button>
                <button onClick = {() => setIsLogin(false)}>REGISTER</button>
            </div>
            {isLogin && <Login /> || <Registration />}
        </div>
    )
}

export default UserForm