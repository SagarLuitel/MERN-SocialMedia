import axios from 'axios'
import React, {useState, useContext, useEffect} from 'react'
import {Post} from './Post'
import { UserContext } from '../context/userContext'

export const Following = () => {
    const {user} = useContext(UserContext)
    const [posts, setPosts] = useState(null)
    useEffect(()=>{
        const getPosts = async() =>{
            let  temp = []
            user.following.forEach((element,index)=>{
                const  userFollowing = user.following[index];
                axios.get('http://localhost:5000/posts/post',{
                    author : userFollowing
                })
                .then(res=>{
                    temp.push(res.data)
                })
            })
            setTimeout(()=>{
                let merged  = temp.flat()
                setPosts(merged)
            },500)
            

        }
        getPosts()
        
    },[user])
    return (
        <div>
            {posts===null?<h1>You arent following anyone</h1> : posts.map(post =>{
                return <Post key={post._id} post = {post} />
            })}
        </div>
    )
}
