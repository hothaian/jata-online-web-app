import React, {useState } from 'react';
 
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootswatch/dist/lux/bootstrap.min.css';

//COMPONENT
import NavBar from './components/NavBar';
import {ShoppingCart} from './components/ShoppingCart';
import Login from './components/LoginWindow';
import SignUp from './components/SignUp';

//PAGES
import { About } from './pages/About';
import { Home } from './pages/Home';
import Profile from './pages/Profile';
import { SingleSellPost } from './components/singleSellPost';
import { CategorySellPost } from './components/CategorySellPost';

const App = () => {  
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/sellpost/:post_id" element={<SingleSellPost />} />
          <Route path="/category/:category_id" element={<CategorySellPost />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;