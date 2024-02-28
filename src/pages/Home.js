// /src/pages/Home.js

import React, { useEffect, useState } from 'react';
import logoImage from '../images/jata_black.png'; // Adjust the path to your logo image
import { sellPosts } from '../hardCodeData/sellPostData';
import { SellPost } from '../components/SellPost';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [sellPostList, setSellPostList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All'); // Default active category
  const [categoryList, setCategoryList] =  useState(null);

  

  //Effect for Sell Post
  useEffect(()=>{
    const fetchSellPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/sellposts');
        if (!response.ok) {
          throw new Error('Error fetching sellposts');
        }
        const data = await response.json();
        console.log(data);
        setSellPostList(data);
      } catch (error) {
        console.error('Error fetching sellposts:', error);
      }
    };
    const fetchCategoryList = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/category');
        if (!response.ok) {
          throw new Error('Error fetching sellposts');
        }
        const data = await response.json();
        console.log(data);
        setCategoryList(data);
      } catch (error) {
        console.error('Error fetching sellposts:', error);
      }
    };

    fetchSellPosts();
    fetchCategoryList();
    },[])
  // const filteredSellPosts = activeCategory === 'All' ? sellPostList : sellPostList.filter(post => post.category === activeCategory);

  // const categories = ['All', ...new Set(sellPosts.map(post => post.category))];
  

  return (

    <>
      <h1>Explore</h1>
      { categoryList ?
          categoryList.map(category => (
                      <Link to={`/category/${category.category_id}`}>
                          <span key={category.category_id} className="badge bg-primary m-1">{category.category_name}</span>
                      </Link>
            ))
          
      :<></>}
      {sellPostList ? sellPostList.map((sellPost) => (
        <SellPost
          key={sellPost.sellpost_id}
          sellpost = {sellPost}
        />
      )) : <></>}
    </>
  
  );
};

 







