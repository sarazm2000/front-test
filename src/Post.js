import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const Post = ({posts}) => {

    return (
        <>
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h4>{post.user.username}</h4>
            <p>{post.text}</p>
          </div>
        ))}
            
        </>
    )
}

export default Post;