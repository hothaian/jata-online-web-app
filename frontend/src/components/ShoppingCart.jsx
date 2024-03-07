import React, { useState } from "react";
import CheckOut from "./CheckOut";
import { useCart } from "../context/CartContext";

export const ShoppingCart = () => {
  const { cartItems: items, setCartItems: setItems } = useCart();

  const increaseQuantity = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {/* <div className="alert alert-dismissible alert-warning">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
        ></button>
        <h4 className="alert-heading">Bag</h4>
        <p className="mb-0">Your shopping cart is currently empty.</p>
      </div> */}
      {items.map((item) => (
        <div style={{ width: "500px" }} key={item.id}>
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-end">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => removeItem(item.id)}
              ></button>
            </div>
            <div className="card-body">
              <h5 className="card-title">{item.item_name}</h5>
            </div>
            <img src={item.picUrl} className="card-img-top" alt={item.title} />
            <div className="card-body">
              <p className="card-text">
                {" "}
                Size: {item.size}
                <br /> Quantity: {item.quantity}
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <br />
                Price: ${Number(item.price).toFixed(2)} <br /> Total: $
                {(item.quantity * item.price)?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div>Subtotal: ${totalPrice.toFixed(2)}</div>
      <CheckOut />
    </div>
  );
};
