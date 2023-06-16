import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style.css";
import { isLoggedIn } from './Helpers';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [status, setStatus] = useState(0);
  const [err, setErr] = useState('')




  const baseURL = 'http://127.0.0.1:8000/api/accounts/register/'
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password
    };
    const log = axios.post(baseURL, userData).then((response) => {
      setStatus(response.status)
      window.localStorage.setItem('username', response.data.username)
      window.localStorage.setItem('token', response.data.tokens.access);
      navigate("/profile")
    }) 

    .catch (error => {
      setStatus(error.response.status)
      if (error.response.data.password != null) {
        setErr(error.response.data.password) 
      }
      if (error.response.data.username != null){
        setErr(error.response.data.username)
      }
    })
  };




  useEffect(() => {
    if (isLoggedIn())
      navigate('/profile');
    else {
      setStatus(0)
      setUsername("")
      setPassword("")
      setErr("")
    }


  }, []);


  const gotoLoginPage = () => navigate("/");
  return (
    <div className="form-container">
      <h1 className='title-page'>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <p className='link-text'>Already have an account? <a className='nav-link' onClick={gotoLoginPage}>Click here!</a></p>
        <input type="submit" value="Register" className="btn" />
      </form>
      {
        status === 0 ? (<></>) : (status === 201 ? (<div className='success'>You logged in</div>) 
        :  (<div className='err'>{err}</div>)
        )       
      }
    </div>
  );
};

export default Register;
