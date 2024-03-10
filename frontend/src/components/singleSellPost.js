import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const SingleSellPost = ({ match }) => {
  const { post_id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1); // State to manage selected quantity
  const [newComment, setNewComment] = useState(""); // State to manage new comment input
  const { userLoggedIn, currentUser, getToken } = useAuth();
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchASellPost = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/sellposts/" + post_id
        );
        if (!response.ok) {
          throw new Error("Failed to get the sellpost");
        }
        const data = await response.json();
        console.log("HEre");

        console.log(data);
        setCurrentPost(data);
        console.log(currentUser);
      } catch (error) {
        console.error("Error fetching the sellpost:", error);
      }
    };
    fetchASellPost();
  }, []);



  // const handleBuyButton = () => {
  //   const itemToAdd = {
  //     title: title,
  //     description: description,
  //     price: price,
  //     quantity: selectedQuantity,
  //   };

  // };

  const handleBuyButton = () => {
    const itemWithQuantity = { ...currentPost, quantity: selectedQuantity };
    addItemToCart(itemWithQuantity);
    // addItemToCart(sellpost);
  };

  const handleQuantityChange = (num) => {
    setSelectedQuantity(num);
  };
  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleAddComment = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: JSON.stringify({
          user_id: currentUser.user_id,
          description: newComment,
          sellpost_id: post_id,
        }),
      });
      const newCom = await response.json();
      const updatedComments = [...currentPost.comments, newCom];
      setCurrentPost({ ...currentPost, comments: updatedComments });
      console.log("Added a Comment successful:", newCom);
      setNewComment("");
    } catch (error) {
      console.error("Error Adding a Comment user:", error);
    }
  };

  return (
    <>
      {currentPost ? (
        <div className="card mb-3 h-100">
          <div className="row g-0 h-100">
            <div className="col-md-6 h-100">
              <div className="card-img-container h-100">
                <img
                  src={currentPost.picUrl}
                  className="card-img-top img-fluid"
                  alt="Product"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-between h-100">
              <div className="border-bottom border-1 border-dark">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        currentPost.seller?.profile_pictureUrl ||
                        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
                      }
                      alt="User Profile"
                      className="rounded-circle me-2"
                      style={{ width: "32px", height: "32px" }}
                    />
                    <div>{currentPost.seller.username}</div>
                  </div>
                  <div>{new Date(currentPost.createdAt).toLocaleString()}</div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{currentPost.item_name}</h5>
                  <p className="card-text">
                    Description: {currentPost.description}
                  </p>
                  <div className="d-flex align-items-center">
                    <p className="card-text me-3 mb-0">
                      Price: ${currentPost.price}
                    </p>
                    <p className="card-text me-3 mb-0">
                      Size: {currentPost.size}
                    </p>
                    <p className="card-text mb-0">
                      Category:{" "}
                      {currentPost.categories.map((category) => (
                        <Link to={`/category/${category.category_id}`}>
                          <span
                            key={category.category_id}
                            className="badge bg-primary m-1"
                          >
                            {category.category_name}
                          </span>
                        </Link>
                      ))}
                    </p>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="quantityDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Quantity: {selectedQuantity}
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="quantityDropdown"
                      >
                        {[...Array(currentPost.quantity).keys()].map((num) => (
                          <li key={num + 1}>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => handleQuantityChange(num + 1)}
                            >
                              {num + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <button onClick= {handleBuyButton}type="button" className="btn btn-primary py-1">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-2 ">
                <h6>Comments:</h6>
                <ul className="list-group">
                  {currentPost.comments &&
                    currentPost.comments.map((comment) => (
                      <li key={comment.comment_id} className="list-group-item">
                        <img
                          src={
                            comment.user.profile_pictureUrl
                              ? comment.user.profile_pictureUrl
                              : "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
                          }
                          alt="User Profile"
                          className="rounded-circle me-2"
                          style={{ width: "32px", height: "32px" }}
                        />
                        <span className="fw-bold">
                          {comment.user.username}:
                        </span>{" "}
                        {comment.description}
                      </li>
                    ))}
                </ul>
                {userLoggedIn ? (
                  <div className="mt-3 d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control me-2 flex-grow-1 shadow-sm border-bottom border-1 border-dark "
                      id="newComment"
                      value={newComment}
                      onChange={handleNewCommentChange}
                    />
                    <button
                      type="button"
                      className="btn  btn-primary"
                      onClick={handleAddComment}
                    >
                      {" "}
                      Comment
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
