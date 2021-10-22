import axios from 'axios'
import React, {useState, useCallback, useEffect} from 'react'
import {Post} from './Post'

export const OtherUser = ({match}) => {
    const [posts, setPosts] = useState([])
    const [following, setFollowing] = useState(false)
    const [otherUser, setOtherUser] = useState(null)
    useEffect(()=>{
        axios.post('http://localhost:5000/users',{
            'userid' : localStorage.getItem('userid')
        })
        .then(res=>{
            if(res.data.following.indexOf(match.params.userid)!==-1){
                setFollowing(true)
            }else{
                setFollowing(false)
            }
        });
        axios.post('http://localhost:5000/posts/post',{
            'authorId' : match.params.userid
        }).then(res=>{
            setPosts(res.data)
        })

        axios.post('http://localhost:5000/users',{
            'userid' : match.params.userid
        }).then(res=>{setOtherUser(res.data)})
    },[])

    const followUser = useCallback(()=>{
        let userid = localStorage.getItem('userid')
        let otheruserid = match.params.userid;
        axios.post('http://localhost:5000/users/follow',{
            'userid' : userid,
            'otheruserid' : otheruserid
        });
        setFollowing(!following)
    },[])

    return (
        <div>
            <h3>{otherUser!==null?otherUser.email: "Loading..."}'s Profile</h3>
            {following === false? <button onClick = {followUser}>Follow</button>:<button onClick={followUser}>Unfollow</button>}
            <div className="posts-grid">
                {posts !== null ? posts.map(post=>{
                    return <Post key={post._id} post = {post} />
                }):<h1>No posts yet</h1>}
            </div>
        </div>
    )
}
