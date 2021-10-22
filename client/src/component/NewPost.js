import axios from 'axios'
import {useState, useContext} from 'react'
import { UserContext } from '../context/userContext'

export const NewPost = () => {
    const [message, setMessage] = useState("")
    const { user } = useContext(UserContext)
    const submitPost = (e) =>{
        e.preventDefault();
        let title= e.target.post_title.value;
        let body = e.target.post_body.value;
        let userid= user._id;
        axios.post('http://localhost:5000/posts/create',{
            "title": title,
            "authorId":userid,
            "body": body
        })
        .then(res => setMessage("Post Submitted"))
    }
    return (
        <div className = "form-container">
            <form onSubmit ={submitPost}>
                <h1>New Post</h1>
                <input type= "text" name = "post_title" placeholder = "Enter a title" required /> <br />
                <textarea name="post_body" placeholder="Enter a post" required /> <br />
                <button> Submit Post </button>
                <p>{message}</p>
            </form>
            
        </div>
    )
}
