import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style.css";


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState('');
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
      setToken(response.data.access)
      setStatus(response.status)
      window.localStorage.setItem('token', response.data.access);
    }) 

    .catch (error => {
      setStatus(error.response.status)
      error.response.data.password ?  setErr(error.response.data.password[0]) 
      : setErr(error.response.data.username[0])
    })
  };




  useEffect(() => {
    setToken("")
    setStatus(0)
    setUsername("")
    setPassword("")
    setErr("")

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
