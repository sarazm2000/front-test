import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Style.css";


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const postLoginDetails = () => {
    fetch("http://localhost:8000/api/accounts/register", {
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


  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here

    postLoginDetails();
    setPassword("");
    setUsername("");
  };

  const gotoLoginPage = () => navigate("/");
  return (
    <div className="form-container">
      <h1 className='title-page'>Register</h1>
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
        <p className='link-text'>Already have an account? <a className='nav-link' onClick={gotoLoginPage}>Click here!</a></p>
        <input type="submit" value="Register" className="btn" />
      </form>
    </div>
  );
};

export default Register;
