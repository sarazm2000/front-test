import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import AddPost from './AddPost';
import "./Style.css";
import Timeline from './Timeline';
import Edit from './Edit';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/timeline' element={<Timeline  />} />
          <Route path='/edit' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;