import React from 'react'
import axios from 'axios'

export const Signup = () => {
    const handleSignup = (e)=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email,password)
        axios.post('http://localhost:4040/user/signup',{
            email:email,
            password:password})
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        e.target.email.value=""
        e.target.password.value=""

    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <input type = "text" name = "email" placeholder  = "email" />
                <input type ="password" name = "password" placeholder =  "*********" />
                <button>Signup</button>
            </form>
        </div>
    )
}
