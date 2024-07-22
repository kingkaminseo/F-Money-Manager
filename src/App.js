import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About';
import Home from './home';
import Login from './components/sign/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
