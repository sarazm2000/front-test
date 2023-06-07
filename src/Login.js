import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Style.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const gotoSignUpPage = () => navigate("/register");

  const postLoginDetails = () => {
    fetch("http://localhost:8000/api/accounts/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.error(err));
};


  const handleLogin = (e) => {
    e.preventDefault();
    // Handle registration logic here

    postLoginDetails();
    setPassword("");
    setUsername("");
  };

    return (
    <div className="form-container">
      <h1 className='title-page'>Login</h1>
      <form className="form" >
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
        <input type="submit" value="Login" className="btn" />
      </form>
    </div>
  );
};

export default Login;
