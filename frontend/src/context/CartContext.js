import React, { createContext, useState, useContext } from "react";

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
