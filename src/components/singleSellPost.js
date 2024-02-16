
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sellPosts } from '../hardCodeData/sellPostData';
import {useAuth} from '../context/AuthContext';

export const SingleSellPost = ({ match }) => {
    const { sellPostID } = useParams();
    const [currentPost, setCurrentPost] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1); // State to manage selected quantity
    const [newComment, setNewComment] = useState(""); // State to manage new comment input
    const { userLoggedIn, currentUser } = useAuth();


    useEffect(()=>{

      const post = sellPosts.find(post => post.sellPostID === sellPostID);
      setCurrentPost(post);
      console.log(currentUser);
    },[])
  // const handleBuyButton = () => {
  //   const itemToAdd = {
  //     title: title,
  //     description: description,
  //     price: price,
  //     quantity: selectedQuantity, 
  //   };

  // };

  const handleQuantityChange = (num) => {
    setSelectedQuantity(num);
  };
  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
};
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
        const updatedComments = [...currentPost.comments, { commentID: currentPost.comments.length + 1, userID: currentUser.displayName, comment: newComment }];
        setCurrentPost({ ...currentPost, comments: updatedComments });
        setNewComment("");
    }
};

  return (
    <div className="card mb-3 h-100">
            <div className="row g-0 h-100">
                <div className="col-md-6 h-100">
                    <div className="card-img-container h-100">
                        <img src={currentPost.picUrl} className="card-img-top img-fluid" alt="Product" style={{ height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-between h-100">
                    <div className='border-bottom border-1 border-dark'>
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img src={currentPost.userProfileURL} alt="User Profile" className="rounded-circle me-2" style={{ width: '32px', height: '32px' }} />
                                <div>{currentPost.userID}</div>
                            </div>
                            <div>{currentPost.datePost}</div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{currentPost.title}</h5>
                            <p className="card-text">Description: {currentPost.description}</p>
                            <div className="d-flex align-items-center">
                                <p className="card-text me-3 mb-0">Price: ${currentPost.price}</p>
                                <p className="card-text me-3 mb-0">Size: {currentPost.size}</p>
                                <p className="card-text mb-0">Category: <span className="badge bg-primary">{currentPost.category}</span></p>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="quantityDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        Quantity: {selectedQuantity}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="quantityDropdown">
                                        {[...Array(currentPost.quantity).keys()].map((num) => (
                                            <li key={num + 1}><button className="dropdown-item" type="button" onClick={() => handleQuantityChange(num + 1)}>{num + 1}</button></li>
                                        ))}
                                    </ul>
                                    <button type="button" className="btn btn-primary py-1">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='m-2 '>
                        <h6>Comments:</h6>
                        <ul className="list-group">
                            {currentPost.comments && currentPost.comments.map((comment) => (
                                <li key={comment.commentID} className="list-group-item">
                                    <span className="fw-bold">{comment.userID}:</span> {comment.comment}
                                </li>
                            ))}
                        </ul> 
                        {userLoggedIn ? <div className="mt-3 d-flex align-items-center">
                            <input type="text" className="form-control me-2 flex-grow-1 shadow-sm border-bottom border-1 border-dark " id="newComment" value={newComment} onChange={handleNewCommentChange} />
                            <button type="button" className="btn  btn-primary" onClick={handleAddComment}> Comment</button>
                        </div> : <></>}
                        
                    </div>
                </div>
            </div>
        </div>
  );
};


