import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "./Helpers";



const Edit = ({username}) => {
    const [change, setChange] = useState()

    const handleSubmit = () => {

    }

    const navigate = useNavigate();

    const goBack = () => navigate("/profile");
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };
      const [token, setToken] = useState(getToken());

    useEffect(() => {
    // Fetch timeline posts from API and set the state
    if (!isLoggedIn())
        navigate('/');
   
    }, []);

    return (
        <>
            <div className="back" onClick={goBack}>back</div>
            <div className="edit-container">
                <input
                className="edit-name"
                type="text"
                placeholder={username}
                onChange={(e) => setChange(e.target.value)}
                required
                /><br />
                <input type="submit" value="Edit" className="btn edit-name-btn" onClick={handleSubmit} />
            </div>
        </>

    )
}

export default Edit;