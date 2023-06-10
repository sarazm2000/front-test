import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from './Navbar';
import Post from './Post';
import "./Style.css";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(0);
  const [err, setErr] = useState('')
  const navigate = useNavigate();


  
  const baseURL = "http://127.0.0.1:8000/api/posts/timeline/";

  const fetchTimelinePosts = async () => {
    await axios.get(baseURL, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`, // Your token here
      }
    })
    .then(res => {
      setPosts(res.data)
     })
     .catch (error => {
      setErr(error.response.data.detail)
      setStatus(error.response.status)
    })
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");  
  }

  useEffect(() => {
    // Fetch timeline posts from API and set the state
    fetchTimelinePosts();
  }, []);


  return (
    <>

    <div className='header-container'>
    <div className="logout" onClick={logout}>logout</div>
          <h1 className='title-page'>Timeline</h1>
        </div>
     <div className="timeline-container">
      <div className="timeline">

      {posts.map((post, index) => (
          <div key={index} className="post">
            <Post username= {post.username} content={post.content} />
          </div>
        ))}
      </div>
      <Navbar />
    </div>
    </>
  );
};

export default Timeline;
