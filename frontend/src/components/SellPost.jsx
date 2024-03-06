
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const SellPost = ({ sellpost, addToCart }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1); // State to manage selected quantity

  const handleBuyButton = () => {
    const itemToAdd = {
      // title: title,
      // description: description,
      // price: price,
      // quantity: selectedQuantity, 
    };
    addToCart(itemToAdd);
  };

  const handleQuantityChange = (num) => {
    setSelectedQuantity(num);
  };


  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-6">
          <Link to={`/sellpost/${sellpost.sellpost_id}`}>
            <div className="card-img-container" style={{ height: '100%' }}>
              <img src={sellpost.picUrl} className="card-img-top img-fluid" alt="Product" style={{ height: '100%', objectFit: 'cover' }} />
            </div>
          </Link>
        </div>
        <div className="col-md-6">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={sellpost.seller.profile_pictureUrl} alt="User Profile" className="rounded-circle me-2" style={{ width: '32px', height: '32px' }} />
              <div>{sellpost.seller.username}</div>
            </div>
            <div>{new Date(sellpost.createdAt).toLocaleString()}</div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{sellpost.item_name}</h5>
            <p className="card-text">Description: {sellpost.description}</p>
            <p className="card-text">Price: ${sellpost.price}</p>
            <p className="card-text">Size: {sellpost.size}</p>
            <p className="card-text">Gender: {sellpost.gender}</p>
            <p className="card-text">Quantity: {sellpost.quantity}</p>
            <p className="card-text">Category:  {sellpost.categories.map(category => (
                   <Link key={category.category_id} to={`/category/${category.category_id}`}>
                      <span key={category.category_id} className="badge bg-primary m-1">{category.category_name}</span>
                    </Link>
              ))}</p>

            {/* <p className="card-text">Category: <span className="badge bg-primary">"default"</span></p> */}
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="quantityDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Quantity: {selectedQuantity}
              </button>
              <ul className="dropdown-menu" aria-labelledby="quantityDropdown">
                {[...Array(sellpost.quantity).keys()].map((num) => (
                  <li key={num + 1}><button className="dropdown-item" type="button" onClick={() => handleQuantityChange(num + 1)}>{num + 1}</button></li>
                ))}
              </ul>
            </div>
            <button type="button" className="btn btn-primary mt-2" onClick={handleBuyButton}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};


