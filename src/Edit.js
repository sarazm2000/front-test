import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "./Helpers";



const Edit = () => {
    const [currentUsername, setCurrentUsername] = useState();
    const [currentEmail, setCurrentEmail] = useState();
    const [currentFName, setCurrentFName] = useState();
    const [currentLName, setCurrentLName] = useState();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [firstname, setFirstname] = useState();
    const [lasttname, setLasttname] = useState();

    const [errUsername, setErrUsername] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [status, setStatus] = useState(0);

    const baseURL = 'http://127.0.0.1:8000/api/accounts/profile/';

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrEmail('');
        setErrUsername('');

        const config = {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`, // Your token here

            }
        };
        const userData = {
            "username": username,
            "email": email,
            "first_name": firstname,
            "last_name": lasttname
        };
        axios.put(baseURL, userData, config).then((response) => {
            setErrUsername('');
            setErrEmail('');
            console.log(response);
            setStatus()

        })
            .catch(error => {
                console.log(error.response);
                if (error.response.data.username) {
                    console.log(error.response.data.username[0]);
                    //   setStatus(error.response.status)
                    setErrUsername(error.response.data.username[0])
                }

                if (error.response.data.email) {
                    console.log(error.response.data.email[0]);
                    //   setStatus(error.response.status)
                    setErrEmail(error.response.data.email[0])
                }

            })
    }

    const navigate = useNavigate();

    const goBack = () => navigate("/profile");

    useEffect(() => {
        // Fetch timeline posts from API and set the state
        if (!isLoggedIn())
            navigate('/');

        const config = {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`, // Your token here

            }
        };
        axios.get(baseURL, config).then((response) => {
            console.log(response);
            setCurrentEmail(response.data.email);
            setCurrentFName(response.data.firstname);
            setCurrentLName(response.data.lasttname);
            setCurrentUsername(response.data.username);
        })
            .catch(error => {
                if (error.response.data.username) {
                    console.log(error.response.data.username[0]);
                    //   setStatus(error.response.status)
                    setErrUsername(error.response.data.username[0])
                }
                console.log(errUsername.response);
                if (error.response.statusText === "Unauthorized") 
                    navigate("/");
            })

    }, []);

    return (
        <>

            <div className="back" onClick={goBack}>back</div>
            <div className="edit-container">
                <h2 className="title-page edit-title">Edit your information</h2>

                <label >Username</label>
                <input
                    className="edit-name"
                    type="text"
                    placeholder={currentUsername}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {errUsername ? (<div className="err">{errUsername}</div>) : (<></>)}
                <br />
                
                

                <label >First Name</label>
                <input
                    className="edit-name"
                    type="text"
                    placeholder={currentFName}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                /><br />

                <label >Last Name</label>
                <input
                    className="edit-name"
                    type="text"
                    placeholder={currentLName}
                    onChange={(e) => setLasttname(e.target.value)}
                    required
                /><br />

                <label >Email</label>
                <input
                    className="edit-name"
                    type="text"
                    placeholder={currentEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errEmail ? (<div className="err">{errEmail}</div>) : (<></>)}

                <br />
                <input type="submit" value="Edit" className="btn edit-name-btn" onClick={handleSubmit} />
                
            </div>
        </>

    )
}

export default Edit;