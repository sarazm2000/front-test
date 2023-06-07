import React, { useState, useEffect } from 'react';
import Post from './Post';
import "./Style.css";

const Timeline = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch timeline posts from API and set the state
    const fetchTimelinePosts = async () => {
      try {
        // Make API requests and set the state accordingly
        const fetchedPosts = [
          {
            username: "Sara",
            content: "I'd heard it time and time again as I worked my way around this great country. Now I could also see",
            timestamp: "2023-05-29T12:00:00Z"
          },
          {
            username: "Abbas",
            content: "I'd heard it time and time again as I worked my way around this great country. Now I could also see",
            timestamp: "2023-05-28T09:30:00Z"
          },
          {
            username: "Negar",
            content: "I'd heard it time and time again as I worked my way around this great country. Now I could also see",
            timestamp: "2023-05-27T16:45:00Z"
          },
          {
            username: "Sara",
            content: "I'd heard it time and time again as I worked my way around this great country. Now I could also see",
            timestamp: "2023-05-29T12:00:00Z"
          },
          {
            username: "Abbas",
            content: "I'd heard it time and time again as I worked my way around this great country. Now I could also see",
            timestamp: "2023-05-28T09:30:00Z"
          },
          {
            username: "Negar",
            content: "I'd heard it time and time again as I worked my way around this great country. Now I could also see",
            timestamp: "2023-05-27T16:45:00Z"
          },
          {
            username: "Sara",
            content: "I'd heard it time and time again as I worked my way around this great country. Now I could also see",
            timestamp: "2023-05-29T12:00:00Z"
          },
          {
            username: "Abbas",
            content: "I'd heard it time and time again as I worked my way around this great country. Now I could also see",
            timestamp: "2023-05-28T09:30:00Z"
          },
          {
            username: "Negar",
            content: "I'd heard it time and time again as I worked my way around this great country. Now I could also see",
            timestamp: "2023-05-27T16:45:00Z"
          }
        ];

        setPosts(fetchedPosts);
      } catch (error) {
        console.log('Error fetching timeline posts:', error);
      }
    };

    fetchTimelinePosts();
  }, []);

  return (
    <div className="container">
      <div className="timeline">

      {posts.map((post, index) => (
          <div key={index} className="post">
            <Post username= {post.username} content={post.content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
