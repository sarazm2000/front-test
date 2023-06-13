import React, { useState, useEffect } from 'react';
import "./Style.css";
import Navbar from './Navbar';
import Timeline from './Timeline';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Post from './Post';
import { isLoggedIn } from './Helpers';



const Profile = () => {

  const [username, setUsername] = useState('');
  const [friends, setFriends] = useState([]);
  const [err, setErr] = useState('');
  const [status, setStatus] = useState(0);


  const navigate = useNavigate();
  const postURL = 'http://127.0.0.1:8000/api/posts/crud/'
  const profileURL = 'http://127.0.0.1:8000/api/accounts/profile/'

  const getName = async () => {
    await axios.get(profileURL, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`, // Your token here
      }
    })
      .then(res => {
        setUsername(res.data.username)
      })
      .catch(error => {
        setErr(error.response.data.detail)
        setStatus(error.response.status)
      })
  }


  useEffect(() => {
    if (!isLoggedIn())
      navigate('/');
    else
      getName();
  }, []);


  const gotoFriendsList = () => navigate("/friends");
  const gotoEdit = () => navigate("/edit");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div>
      <div className='header-container'>
        <div className="logout" onClick={logout}>logout</div>
        <h1 className='title-page'>{username}</h1>
        <div className='edit' onClick={gotoEdit}>Edit</div>
        <h3 className='title-page friends-list-title page-link' onClick={gotoFriendsList}>Friends</h3>
      </div>

      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
      <div className='timeline-container'>
        <div className="container">
          <div className="timeline">

            <Post />

          </div>
        </div>
      </div>
      <Navbar />

    </div>
  )
};

export default Profile;
