import axios from 'axios'
import React, {useState, useEffect, useCallback, useContext} from 'react'
import { UserContext } from '../context/userContext'
import {Link} from 'react-router-dom'
import {Comments} from "./Comments"


export const Post = ({post}) => {
    const [postData, setPostData] = useState(post)
    const {user} = useContext(UserContext)
    let [author, setAuthor] = useState(null)
    useEffect(() => {
        axios.post('http://localhost:5000/users',{
            userid: post.authorId
        })
        .then(res => setAuthor(res.data.username))

        axios.post('http://localhost:5000/posts/post',{
            "_id" : post._id
        })
    }, [])

    const likePost = useCallback(() => {
            axios.post('http"//localhost:5000/posts/like',{
                "userid" : user._id,
                "postid": post._id
            })
            .then(res => setPostData(res.data))
        },
        [],)
        const  addComment = useCallback((e) => {
                axios.post('http://localhost:5000/posts/comment/new',{
                    "userid" :  user._id,
                    "postid"  :  post._id,
                    "content" :e.target.comment.value
                })
            },
            [],
        )
    return (
        <div className="post-container">
            <div className="post">
            <h1> {postData.title} </h1>
            <h3><Link to ={`/user/${postData.authorId}`}>{author}</Link></h3>
            <p>{postData.body}</p>
            <p></p>
            <button onClick={likePost}><img src ="https://cdn.vox-cdn.com/thumbor/Y_XL-l7J7lMBsA_xKrGHsbA0CKU=/0x0:640x426/920x613/filters:focal(269x162:371x264):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/51868655/like.0.jpeg" alt="like" /><h1>{postData.likes}</h1></button>
            </div>
            <div className="comment-container">
                {postData.comments.lenght>0?postData.comment.map(comment=>{
                    return <Comments key={comment._id} comment = {comment} />
                }):<h3>No comments</h3>}
            </div>
            <div className="new-comment">
                <from onSubmit={addComment}>
                    <input type="text" name ="comment" placeholder="enter comment" />
                    <button>Submit Comment</button>
                </from>
            </div>
        </div>
    )
}
