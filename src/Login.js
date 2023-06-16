import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Style.css";
import axios from "axios";
import { isLoggedIn } from './Helpers';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(0);
  const [err, setErr] = useState('')
  const navigate = useNavigate();

  const gotoSignUpPage = () => navigate("/register");

  const baseURL = 'http://127.0.0.1:8000/api/accounts/login/';
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password
    };
    axios.post(baseURL, userData).then((response) => {
      window.localStorage.setItem('token', response.data.access);
      setStatus(response.status)
      const str = window.localStorage.getItem('token');
      navigate("/profile")
    })
      .catch(error => {
        setStatus(error.response.status);
        setErr(error.response.data.detail);
        if (error.response.data.password != null) {
          setErr(error.response.data.password)
        }
        if (error.response.data.username != null) {
          setErr(error.response.data.username)
        }
        // setErr(error.response.data.detail);
        // setStatus(error.response.status);
        // error.response.data.password === null ?  setErr(error.response.data.password[0]) 
        // : setErr(error.response.data.username[0])
      })
  };

  const shouldAuthenticate = () => {
    if (toString(window.localStorage.getItem('token')).length < 0) {
      return true
    }
    return false
  }

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

  return (
    shouldAuthenticate() ? (<>{navigate('/profile')}</>) :
      (<div className="form-container">
        <h1 className='title-page'>Login</h1>
        <form className="form" onSubmit={handleSubmit} >
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
          <p className='link-text'>Don't have account? <a className='nav-link' onClick={gotoSignUpPage}>Click here!</a></p>
          <input type="submit" value="Login" className="btn log-btn" />

        </form>


        {
          status === 401 ? (<div className='err'>{err}</div>) :
            (
              status === 0 ? (<></>) :
              
                <div className='success'>You logged in</div>

            )
        }

      </div>))
};

export default Login;
