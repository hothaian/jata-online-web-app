import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootswatch/dist/lux/bootstrap.min.css"; // Import Bootswatch theme CSS
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </CartProvider>
);
