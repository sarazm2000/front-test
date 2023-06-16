import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "./Helpers";


const AddPost = () => {
  const [post, setPost] = useState('');
  const baseURL = 'http://127.0.0.1:8000/api/posts/crud/';
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn())
      navigate('/');
  }, []);
  const goProfile = () => navigate("/profile");

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`, // Your token here

      }
    };
    const userData = {
      text: post
    };
    axios.post(baseURL, userData, config).then((response) => {
    })
      .catch(error => {
        //   setStatus(error.response.status)
        //   setErr(error.response.data.detail)
      })
    setPost('');
    goProfile();
  };




  return (
    <div>
      <div className="post-area" >

        <form className="form" >
          <h2 className="title-page">Add Post</h2>
          <textarea
            className="text-area"
            type="text"
            placeholder="write your post..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
            required
          /><br />
          <input type="submit" value="Post" className="btn" onClick={handleSubmit} />
        </form>
      </div>
      <Navbar />
    </div>
  );
}

export default AddPost;