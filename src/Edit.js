import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Edit = ({username}) => {
    const [change, setChange] = useState()

    const handleSubmit = () => {

    }

    const navigate = useNavigate();

    const goBack = () => navigate("/profile");

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