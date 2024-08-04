import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About';
import Home from './home';
import Login from './components/sign/Login';
import Sign from './components/sign/signin';
import Add from './components/add';
import AddFriend from './components/friend';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Sign' element={<Sign />} />
        <Route path='/' element={<Login />} />
        <Route path='/*' element={<About />} />
        <Route path='/Add' element={<Add />} />
        <Route path='/AddFriend' element={<AddFriend />} />
      </Routes>
    </Router>
  );
}

export default App;
