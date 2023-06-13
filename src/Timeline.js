import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from './Helpers';

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
      let arr = res.data;
      setPosts(res.data);
     })
     .catch (error => {
      setErr(error.response.data.detail)
      setStatus(error.response.status)
    })
  }


  useEffect(() => {
    // Fetch timeline posts from API and set the state
    if (!isLoggedIn())
      navigate('/');
    else
    fetchTimelinePosts();
  }, []);


  return (
    <>
    <div className='header-container'>
          <h1 className='title-page'>Timeline</h1>
        </div>
     <div className="timeline-container">
      <div className="timeline">

      {posts.map((post, index) => (
          <div key={index} className="post">
            <h4>{post.user.username}</h4>
            <p>{post.text}</p>
          </div>
        ))}

      </div>
      <Navbar />
    </div>
    </>
  );
};

export default Timeline;
