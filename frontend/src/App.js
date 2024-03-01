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
<<<<<<< HEAD:src/App.js
import { SingleSellPost } from './components/singleSellPost';
=======
import PieChart from './components/Charts/PieChart';
import BarChart from './components/Charts/BarChart';
>>>>>>> origin/an-ho:frontend/src/App.js

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
<<<<<<< HEAD:src/App.js
          <Route path="/sellpost/:sellPostID" element={<SingleSellPost />} />

=======
          <Route path="/piechart" element={<PieChart />} />
          <Route path="/barchart" element={<BarChart/>} />
>>>>>>> origin/an-ho:frontend/src/App.js
        </Routes>
      </div>
    </Router>
  );
};

export default App;