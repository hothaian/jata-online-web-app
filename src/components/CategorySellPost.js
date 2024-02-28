import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SellPost } from './SellPost';

export const CategorySellPost = ({addToCart }) => {
    const { category_id } = useParams();

    const [category, setCategory] = useState([]);
    
  
    //Effect for Sell Post
    useEffect(()=>{
      const fetchSellPosts = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/category/'+category_id);
          if (!response.ok) {
            throw new Error('Error fetching sellposts by category ');
          }
          const data = await response.json();
          data.sellposts.sort((a, b) =>  b.sellpost_id - a.sellpost_id);
          console.log(data);
          setCategory(data);
        } catch (error) {
          console.error('Error fetching sellposts by category:', error);
        }
      };
  
      fetchSellPosts();
  
      },[])


  return (
    <>
    
    <h1>{category?.category_name}</h1>
   
    {category?.sellposts ? category.sellposts.map((sellPost) => (
      <SellPost
        key={sellPost.sellpost_id}
        sellpost = {sellPost}
      />
    )) : <></>}
  </>
  );
};


