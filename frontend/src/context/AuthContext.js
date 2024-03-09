/**
 * Author: An Ho
 */
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

// AuthProvider component to manage authentication state

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      try {
        
        const response = await fetch('http://localhost:8080/api/user/email/'+user.email); 
        if (!response.ok) {
          throw new Error('Failed to get the user via email  ' + user.email);
        }
        const data = await response.json();
        user.user_id = data.user_id;
        console.log("Found the match email of the user");
      } catch (error) {
        console.error('Error fetching the user via email:', error);
        console.log("User not in local mySQL Database, navigate to Sign Up With API Form");
        navigate('/signup-api')

       
      }

      setCurrentUser({ ...user });

      // check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    setUserLoggedIn,
    isEmailUser,
    currentUser,
    setCurrentUser,
    loading,

  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
