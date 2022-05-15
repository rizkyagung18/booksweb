import React, {  useState, useEffect, useRef } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { HomeScreen, WishlistScreen } from './pages';
import 'bulma/css/bulma.min.css';
import './index.scss';
import { Navbar } from './components';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container px-6'>
        <Routes>
          <Route path='/' element={<HomeScreen />}  />
          <Route path='/wishlist' element={<WishlistScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
