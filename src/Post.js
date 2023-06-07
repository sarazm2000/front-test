import React from "react";

const Post = ({username, content}) => {
    return (
        <div className="post">
            <h4>{username}</h4>
            <p>{content}</p>
        </div>
    )
}

export default Post;