// FriendsList.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../Helpers';
import './FriendsList.css'; // Import your CSS

const FriendsList  = () => {
    const [friendsList, setFriendsList] = useState([]);
    const navigate = useNavigate();
    const apiUrl = `http://127.0.0.1:8000/api/friends/crud/`; // Your API URL here


    useEffect(() => {
        if (!isLoggedIn())
          navigate('/');
        else {
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`, // Your token here
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setFriendsList(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });}
    }, []);

    const handleDeleteFriend = async (friendId) => {
        const deleteUrl = `http://127.0.0.1:8000/api/friends/crud/${friendId}/`; // Your DELETE URL here
        const deleteResponse = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`, // Your token here
            },
        });
    
        if (!deleteResponse.ok) {
          console.error("An error occurred while deleting the friend.");
          return;
        }
        setFriendsList(friendsList.filter(friend => friend.id !== friendId));
    };

    const goBack = () => navigate("/profile");
    return (
        <>
            <div className="back" onClick={goBack}>back</div>
            <div className="friends-list">
                <h1>Your Friends</h1>
                <div style={{ overflowY: 'scroll' }}>
                {friendsList.map(friend => 
                    <div key={friend.followed.id} className="friend-item">
                        <p>{friend.followed.username}</p>
                        <button onClick={() => handleDeleteFriend(friend.id)}>Delete friend</button>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};

export { FriendsList };
