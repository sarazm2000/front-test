import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import "./Style.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;