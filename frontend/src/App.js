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
import NavBar from './components/NavBar/NavBar';
import {ShoppingCart} from './components/ShoppingCart';
import Login from './components/LoginWindow';
import SignUp from './components/SignUp/SignUp';
import SignUpWithAPI from './components/SignUp/SignUpWithAPI';
import AddSellPost from './components/AddSellPost';
import OrderCategoryChart from './components/Charts/OrderCategoryChart';
import CustomerSpendChart from './components/Charts/CustomerSpendChart';

//PAGES
import  About  from './pages/About';
import { Home } from './pages/Home';
import Profile from './pages/Profile';
import { SingleSellPost } from './components/singleSellPost';
import { CategorySellPost } from './components/CategorySellPost';
import EditProfile from './components/EditProfile';

const App = () => {  

  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    setScrolling(window.scrollY > 10); // Adjust the threshold as needed
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
      <div>
        <NavBar  floating={scrolling} />
        <div style={{ marginTop: '110px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-api" element={<SignUpWithAPI/>} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/customer-spend-chart" element={<CustomerSpendChart/>} />
          <Route path="/order-by-category" element={<OrderCategoryChart />} />
          <Route path="/add-sell-post" element={<AddSellPost/>} />

          <Route path="/cart" element={<ShoppingCart />} />         
          <Route path="/sellpost/:post_id" element={<SingleSellPost />} />
          <Route path="/category/:category_id" element={<CategorySellPost />} />

        </Routes>
        </div>


      </div>
  );
};

export default App;