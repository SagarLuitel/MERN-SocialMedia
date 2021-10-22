import React, {useState, useMemo, useEffect} from 'react'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import { Home } from './Home'
import {Signup} from './Signup'
import { Login } from './Login'
import {NewPost} from './NewPost'
import {Likes} from './Likes'
import {Following} from './Following'
import {Profile} from'./Profile'
import {Navbar} from './Navbar'
import {OtherUser} from './OtherUser'
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

export const UserInterface = () => {
    const [user, setUser] = useState(null);
    const currentUser = useMemo(()=> ({user,setUser}), [user,setUser] )

    useEffect(()=>{
        if(localStorage.getItem('userid') !== null){
            axios.post("http://localhost:5000/user/",{
                "userid" : localStorage.getItem('userid')
            })
                .then(res => setUser(res.data))
        }
    },[])




    return (
        <div>
            <UserContext.Provider value = {currentUser} >
            <Router >
                <Navbar />
        <Switch >
        <Route exact path='/'><Home /></Route>
        <Route path="/signup">{user!==null?<Redirect to="/profile"/>:<Signup />}  </Route>
        <Route path="/login"> {user!==null?<Redirect to="/profile"/>:<Login />} </Route>
        <Route path="/newpost"> {user===null?<Redirect to="/login"/>:<NewPost/>} </Route>
        <Route path="/Likes"> {user===null?<Redirect to="/login"/>:<Likes/>} </Route>
        <Route path="/Following"> {user===null?<Redirect to="/login"/>:<Following/>} </Route>
        <Route path="/profile"> {user===null?<Redirect to="/login"/>:<Profile/>} </Route>
        <Route exact path = "/user/:userid"><OtherUser /> </Route> 
        </Switch>
    </Router>
    </UserContext.Provider>
        </div>
    )
}
