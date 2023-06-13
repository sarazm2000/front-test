import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import AddPost from './AddPost';
import "./Style.css";
import Timeline from './Timeline';
import Edit from './Edit';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from "./components/SearchResultsList";
import { FriendsList } from './FriendsListComponent/FriendsList'; // Import your new component


const App = () => {
  
  const [results, setResults] = useState([]);
  return (
  
    <BrowserRouter >
      <Routes>
      <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/add-post' element={<AddPost />} />
            <Route path='/timeline' element={<Timeline  />} />
            <Route path="/search" element={
            <div className="App">
              <div className="search-bar-container">
                <SearchBar setResults={setResults} />
                {results && results.length > 0 && <SearchResultsList results={results} />}
              </div>
            </div>
          } />
            <Route path='/edit' element={<Edit />} />
            <Route path="/friends" element={<FriendsList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;