import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from '../Navbar';
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    const username = value.trim(); // Trim the input value to remove leading/trailing spaces
    console.log("fetchData called with value:", username); // debug log
    if (username) {
      fetch(`http://127.0.0.1:8000/api/friends/search/?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`, // replace with your token
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          const results = json.filter((user) => {
            return (
              value &&
              user &&
              user.username &&
              user.username.toLowerCase().startsWith(value.toLowerCase())
            );
          });
          setResults(results); // Set the results directly from the response
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    } else {
      // If the input value is empty, reset the results
      setResults([]);
    }
  };

  const handleChange = (value) => {
    console.log("handleChange called with value:", value); // debug log
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Navbar /> 
    </div>
  );
};