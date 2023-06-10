import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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

    return (
        token ? 
        (<>
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
        </>)
        :
        (<>{navigate('/')}</>)
    )
}

export default Edit;