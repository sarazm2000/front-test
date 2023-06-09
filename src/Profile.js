import React, { useState, useEffect } from 'react';
import "./Style.css";
import Navbar from './Navbar';
import Timeline from './Timeline';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const Profile = ({isProfile}) => {
  const [username, setUsername] = useState('');
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);


  const corsConf = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  }

  const navigate = useNavigate();

  // const componentDidMount = async() => {
  //   try {
  //     const res = await axios.get ('http://127.0.0.1:8000/api/posts/crud', {
  //       headers: {
  //         // 'Access-Control-Allow-Origin': '*',
  //         // 'Access-Control-Request-Headers': '*',
  //         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NjQyMTE2NCwiaWF0IjoxNjg2MzM0NzY0LCJqdGkiOiI2M2MyNzIyZTQwYzE0NjczOTViNTMwMDk4MTNhYTJiMCIsInVzZXJfaWQiOjF9.6TkDRl5mmcJXjkzSV70o1-SPHSGbVi6OtRHq0U-kNwU‍`
  //       }, // Your token here

  //       },
  //     );
  //     console.log(res);
  //   } catch {
  //     console.log(error.response);
  //   }
    
  // }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts/crud', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1OTY3NDMzLCJpYXQiOjE2ODU5NjU2MzMsImp0aSI6ImZlNGM4MzhiYzMwYjRmMjc5YWJkZDQ3ZWZhNWQ3NTM5IiwidXNlcl9pZCI6MTh9.fUep8BTRTpjY1Sb889AypmyDiWFgWLv8rrUMsrvjs2I`, // Your token here
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        setPosts(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}, []);


  // // Fetch user data and populate state variables
  // useEffect(() => {
  //   // Fetch user data from API and set username, friends, and posts
  //   const fetchData = async () => {
  //     try {
  //       // Make API requests and set the state accordingly
  //       componentDidMount();
  //     } catch (error) {
  //       console.log('Error fetching user data:', error);
  //     }
  //   };
  //   setUsername("sara");
    
  //   fetchData();
  // }, []);


  const gotoFriendsList = () => navigate("/friends");
  const gotoEdit = () => navigate("/edit");
  
  return (
    isProfile ?
    <div>
        <div className='header-container'>
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
        <Timeline />
      </div>
        <Navbar />

    </div>

    :

    <div>
      <div className='header-container'>
          <h1 className='title-page'>Timeline</h1>
        </div>
      <div className='timeline-container'>
        <Timeline />
      </div>
        <Navbar />

    </div>
  
  );
};

export default Profile;
