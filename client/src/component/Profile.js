import axios from 'axios'
import { UserContext } from '../context/userContext'
import React, {useEffect, useState, useContext} from 'react'
import {Post} from './Post'


export const Profile = () => {
    const { user } = useContext(UserContext)
    const [posts,  setPosts] = useState([])

    useEffect(() => {
        axios.post('http://localhost:500/posts/post',{
            "authorId" : user._id,
        })
            .then(res=>setPosts(res.data));
    }, [])
    return (
        <div>
            <h1>{user.email}'s Post</h1>
            <div  className = "posts-grid">
            {posts !==null ? posts.map(post=>{
                return <Post key={post._id} post={post} />
            }): <h1>No posts from user</h1>}
            </div>
            
        </div>
    )
}
