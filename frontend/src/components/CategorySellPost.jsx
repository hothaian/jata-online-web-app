import React, { useState, useEffect } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { SellPost } from "./SellPost";
import { Link, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const CategorySellPost = ({ addToCart }) => {
  const { category_id } = useParams();
  const [category, setCategory] = useState([]);

  //Effect for Sell Post
  useEffect(() => {
    const fetchSellPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/category/" + category_id
        );
        if (!response.ok) {
          throw new Error("Error fetching sellposts by category ");
        }
        const data = await response.json();
        data.sellposts.sort((a, b) => b.sellpost_id - a.sellpost_id);
        console.log(data);
        setCategory(data);
      } catch (error) {
        console.error("Error fetching sellposts by category:", error);
      }
    };

    fetchSellPosts();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Explore</h1>
        <div>
          <Link to="/">
            <HomeIcon />
          </Link>
          /
          <Link
            key={category.category_id}
            to={`/category/${category.category_id}`}
          >
            <span key={category.category_id} className="badge bg-primary m-1">
              {category.category_name}
            </span>
          </Link>
        </div>
      </div>

      {category?.sellposts ? (
        <MDBRow>
          {category.sellposts.map((sellPost, index) => (
            <MDBCol lg="6" key={sellPost.sellpost_id}>
              <div>
                <SellPost sellpost={sellPost} />
              </div>
            </MDBCol>
          ))}
        </MDBRow>
      ) : (
        <></>
      )}
    </>
  );
};
