import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const Post = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const baseURL = 'http://127.0.0.1:8000/api/posts/crud/';
    
      useEffect(() => {
        axios.get(baseURL, {
            headers: {
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`, // Your token here
            }
          })
          .then(res => {
              // setUsername(res.data.user.username);
              // setDate(res.data.created);
              // setId(res.data.id);
              // setContent(res.data.text);
              let arr = res.data;
              setPosts(arr);
              console.log("hi",posts);
          })
          .catch (err => {
            console.log(err);
          })
 
    }, []);

    return (
        <>
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h4>{post.user.username}</h4>
            <p>{post.text}</p>
          </div>
        ))}
            
        </>
    )
}

export default Post;