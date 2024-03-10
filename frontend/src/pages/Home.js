// /src/pages/Home.js

import React, { useEffect, useState } from "react";
import { SellPost } from "../components/SellPost";
import { Link } from "react-router-dom";
import {
  MDBCol,
  MDBRow
} from "mdb-react-ui-kit";


export const Home = () => {
  const [sellPostList, setSellPostList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All"); // Default active category
  const [categoryList, setCategoryList] = useState(null);

  //Effect for Sell Post
  useEffect(() => {
    const fetchSellPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/sellposts");
        if (!response.ok) {
          throw new Error("Error fetching sellposts");
        }
        const data = await response.json();
        console.log(data);
        setSellPostList(data);
      } catch (error) {
        console.error("Error fetching sellposts:", error);
      }
    };
    const fetchCategoryList = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) {
          throw new Error("Error fetching list of category");
        }
        const data = await response.json();
        console.log(data);
        setCategoryList(data);
      } catch (error) {
        console.error("Error fetching list of category:", error);
      }
    };

    fetchSellPosts();
    fetchCategoryList();
  }, []);
  // const filteredSellPosts = activeCategory === 'All' ? sellPostList : sellPostList.filter(post => post.category === activeCategory);

  // const categories = ['All', ...new Set(sellPosts.map(post => post.category))];

  return (
    <>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <h1>Explore</h1>
  <div>
    {categoryList ? (
      categoryList.map((category) => (
        <Link
          key={category.category_id}
          to={`/category/${category.category_id}`}
        >
          <span key={category.category_id} className="badge bg-primary m-1">
            {category.category_name}
          </span>
        </Link>
      ))
    ) : (
      <></>
    )}
  </div>
</div>


{sellPostList ? (
  <MDBRow>
    {sellPostList.map((sellPost, index) => (
      <React.Fragment key={sellPost.sellpost_id}>
        <MDBCol lg="6" className="mb-4">
          <SellPost sellpost={sellPost} />
        </MDBCol>
        {(index + 1) % 2 === 0 && <div className="w-100"></div>} {/* Add a new row after every 2 SellPosts */}
      </React.Fragment>
    ))}
  </MDBRow>
      ) : (
        <></>
      )}
    </>
  );
};
