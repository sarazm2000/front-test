import React, { useState } from "react";
import Navbar from "./Navbar";

const AddPost = () => {
    const [post, setPost] = useState('');

    return (
        <div>
        <div className="post-area" >
            {/* <h2 className="title-page">Add Post</h2>
            <textarea className="text-area" onChange={(e) => setPost(e.target.value)}></textarea>
            <input type="submit" value="Login" className="btn" /> */}

            <form className="form" >
                <h2 className="title-page">Add Post</h2>
                    <textarea
                    className="text-area"
                    type="text"
                    placeholder="write your post..."
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    required
                    /><br />                    
                    <input type="submit" value="Post" className="btn" />
                </form>
        </div>
        <Navbar />
        </div>
    );
}

export default AddPost;