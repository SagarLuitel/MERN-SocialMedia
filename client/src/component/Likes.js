import axios from 'axios'
import { UserContext } from '../context/userContext'
import React, {useEffect, useState, useContext} from 'react'
import {Post} from './Post'


export const Likes = () => {
    const {user} = useContext(UserContext)
    const [posts, setPosts] = useState(null)
    useEffect(()=>{
        const getPosts = async() =>{
            let  temp = []
            user.likedposts.forEach((postid)=>{
                axios.get('http://localhost:5000/posts/post',{
                    '_id':postid
                })
                .then(res=>{
                    temp.push(res.data[0])
                })
            })
            setTimeout(()=>{
                setPosts(temp)
            },500)
            

        }
        getPosts()
        
    },[])

    return (
        <div>
            <h3>{user.email}'s likes</h3>
            <div className="post-grid">
                {posts!==null ? posts.map(post =>{
                    return <Post  key={post._id} post = {post} />
                }):  <h1>No Likes Yet</h1>}
            </div>
        </div>
    )
}