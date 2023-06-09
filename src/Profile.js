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
  const [data, setData] = useState([]);





  const navigate = useNavigate();
  const postURL = 'http://127.0.0.1:8000/api/posts/crud/'
  const profileURL = 'http://127.0.0.1:8000/api/accounts/profile/'


  useEffect(() => {


  }, []);


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

    const getData = async () => {
      await axios.get(postURL, {
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
          setData(arr);
        })
        .catch(err => {
          console.log(err.response.statusText);
          if (err.response.statusText === "Unauthorized") {
            navigate("/");
          }
        })
    }

    getData();
    setUsername(window.localStorage.getItem('username'));
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
        <h3 className='edit' onClick={gotoEdit}>Edit</h3>
        <h3 className='title-page friends-list-title page-link edit' onClick={gotoFriendsList}>Friends</h3>
      </div>

      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
      <div className='timeline-container'>
        <div className="container">
          <div className="timeline">

            <Post posts={data} />

          </div>
        </div>
      </div>
      <Navbar />

    </div>
  )
};

export default Profile;
