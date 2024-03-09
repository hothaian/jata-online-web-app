import React, {useState,useEffect } from 'react';
 
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
import AddSellPost from './components/AddSellPost';
import OrderCategoryChart from './components/Charts/OrderCategoryChart';
import BarChart from './components/Charts/BarChart';

//PAGES
import { About } from './pages/About';
import { Home } from './pages/Home';
import Profile from './pages/Profile';
import { SingleSellPost } from './components/singleSellPost';
import { CategorySellPost } from './components/CategorySellPost';
import SignUpWithAPI from './components/SignUpWithAPI';
import EditProfile from './components/EditProfile';

const App = () => {  



  return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-api" element={<SignUpWithAPI/>} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/barchart" element={<BarChart/>} />
          <Route path="/order-by-category" element={<OrderCategoryChart />} />
          <Route path="/add-sell-post" element={<AddSellPost/>} />

          <Route path="/cart" element={<ShoppingCart />} />         
          <Route path="/sellpost/:post_id" element={<SingleSellPost />} />
          <Route path="/category/:category_id" element={<CategorySellPost />} />

        </Routes>
      </div>
  );
};

export default App;