import React from 'react'
import axios from 'axios'
import {Profile} from './Profile'
import {useContext} from 'react'
import { UserContext } from '../context/userContext'
 
export const Login = () => {

    const  {user,setUser} = useContext(UserContext)

    const handleLogin = (e)=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email,password)
        axios.post('http://localhost:4040/user/login',{
            email:email,
            password:password})
            .then(res=>{
                setUser(res.data)
                localStorage.setItem('userid', res.data.user._id)
            })
            .catch(err=>{
                console.log(err)
            })
        e.target.email.value=""
        e.target.password.value=""

    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type = "text" name = "email" placeholder  = "email" />
                <input type ="password" name = "password" placeholder =  "*********" />
                <button>Login</button>
            </form>
        </div>
    )
    
}
