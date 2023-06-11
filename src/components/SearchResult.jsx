import "./SearchResult.css";

export const SearchResult = ({ result }) => {

  const handleAddFriend = async (userId) => {
      // First, fetch the user's current friends list
    const getResponse = await fetch(`http://127.0.0.1:8000/api/friends/crud/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
    // Check if the GET request was successful
    if (!getResponse.ok) {
      console.error("An error occurred while fetching the user's friends list.");
      return;
    }
    // Convert the response to JSON
    const friendsList = await getResponse.json();

    // Log the friends list to the console
    console.log(friendsList);

    let followedUsernames = friendsList.map(obj => obj.followed.username);
    console.log(followedUsernames); // This will log an array of usernames

      // Check if the username is already in the followedUsernames list
    if (followedUsernames.includes(result.username)) {
      // The user is already a friend, abort the function or give an alert
      alert(`${result.username} is already your friend.`);
      return;
    }


    alert(`Adding ${result.username} as a friend.`);
    // add logic to add friend here.
    // adding friends for user.
    const apiUrl = `http://127.0.0.1:8000/api/friends/crud/`; // Update with your actual API URL
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` // Replace with the actual token
      },
      body: JSON.stringify({ "followed": userId })
    };
  
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Friend added successfully:', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="search-result">
      {result.username}
      <button onClick={() => handleAddFriend(result.id)}>Add friend</button>
    </div>
  );
};