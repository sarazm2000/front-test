import React from "react";
import { useNavigate } from "react-router-dom";

const Post = ({username, content}) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");  
      }
      
    return (
        <>
        <div className="post">
            <h4>{username}</h4>
            <p>{content}</p>
        </div>
        </>
    )
}

export default Post;