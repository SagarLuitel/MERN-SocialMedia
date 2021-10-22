import React from 'react'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import { UserContext } from '../context/userContext'

export const Navbar = () => {
    const {user, setUser} = useContext(UserContext)
    if(user===null){
    return (
        <nav>
            <ul>
                <li><Link to="/"> Home  </Link></li>
                <li><Link to="/login"> Login </Link></li>
                <li><Link to="/signup"> Signup </Link></li>
            </ul>
            
        </nav>
    )
    }
    else{
        return(
            <nav className="nav-main">
                <ul>
                <li><Link to="/"> Home  </Link></li>
                <li><Link to="/profile"> Profile </Link></li>
                <li><Link to="/newPost"> New Post </Link></li>
                <li><Link to="following"> Following </Link></li>
                <li><Link to="/likes"> Liked Posts </Link></li>
                <li><a onClick={()=>(
                    setUser(null),
                    localStorage.removeItem('userid')
                )}> Logout </a></li>
                </ul>
            </nav>
        )
                
    }
}
