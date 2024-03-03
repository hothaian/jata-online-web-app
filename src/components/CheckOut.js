import React from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function CheckOut() {
  const { cartItems: cart, clearCart } = useCart();
  const API_URL = "http://localhost:3001";
  const PayPalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });
  const { currentUser } = useAuth();

  const createOrder = async (data) => {
    const { quantity, price: total_price } = cart.reduce(
      (a, b) => {
        return {
          quantity: a.quantity + b.quantity,
          price: a.price + b.price * b.quantity,
        };
      },
      { quantity: 0, price: 0 }
    );

    const items = {
      sellpost_id: cart[0].id,
      seller_id: 1, // replace with actual seller id
      buyer_id: currentUser.uid,
      quantity: quantity,
      total_price: total_price,
      order_shipping_state: "",
      shipping_address: "test address",
    };

    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...items,
      }),
    });
    const order = await res.json();
    return order.id;
  };

  const onApprove = async (data) => {
    const res = await fetch(`${API_URL}/api/orders/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });

    const order = await res.json();
    if (order.status === "COMPLETED") {
      alert("Payment Successful");
      clearCart();
    } else {
      alert("Payment Failed");
    }
  };

  return (
    <PayPalButton
      createOrder={(data) => createOrder(data)}
      onApprove={(data) => onApprove(data)}
    />
  );
}
