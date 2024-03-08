/**
 * Author: An Ho
 */
import React, { useState, useEffect, useHistory } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doSignInWithGithub, doSignInWithFacebook } from '../firebase/auth'
import { useAuth } from '../context/AuthContext'

import {FaGithub, FaGoogle } from 'react-icons/fa';





const Login = () => {

    const navigate = useNavigate(); 
    const { userLoggedIn, currentUser } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    useEffect(() => {
        // Check if the user is logged in when the component mounts
        if (userLoggedIn) {
          // Redirect to the home page if the user is already logged in
          navigate('/');
        }
      }, [userLoggedIn]);

      // For Email Login User
      const onSubmit = async (e) => {
        e.preventDefault();
        
        if (!isSigningIn) {
            setIsSigningIn(true);
    
            try {
                await doSignInWithEmailAndPassword(email, password);
                // If the login is successful, you can perform additional actions here if needed.
            } catch (error) {
                // Handle login error
                console.error('Error signing in:', error.message);
            } finally {
                // Reset the signing in state whether the sign-in is successful or not
                setIsSigningIn(false);
            }
        }
    };
    // For Third Party Login User
    const onSignIn = async (e, provider) => {
      e.preventDefault();
    
      try {
        if (!isSigningIn) {
          setIsSigningIn(true);
    
          switch (provider) {
            case 'google':
              await doSignInWithGoogle();
              break;
            case 'github':
              await doSignInWithGithub();
              break;
            default:
              throw new Error("Invalid provider");
          }
    

        }
      } catch (err) {
        console.error("Error during sign-in:", err);
      } finally {
        // Reset the signing in state, regardless of success or failure
        setIsSigningIn(false);
         

      }
    };



      return (
        <section
        className="vh-110 bg-image"
        style={{
          backgroundImage:
            "url('https://hdwallpaperim.com/wp-content/uploads/2017/08/24/115306-minimalism-colorful.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">Please enter your login and password!</p>
    
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>
    
                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                      </div>
    
                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Forgot password?
                        </a>
                      </p>
    
                      <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={onSubmit}>
                        {isSigningIn ? 'Signing In...' : 'Login'}
                      </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">

                    <a href="#!" 
                    className="text-white mx-2"                                
                    disabled={isSigningIn}
                    onClick={(e) => { onSignIn(e, 'github') }}
                    ><FaGithub size="2em" /></a>

                    <a href="#!" 
                    className="text-white mx-2"
                    disabled={isSigningIn}
                    onClick={(e) => { onSignIn(e, 'google') }}
                    ><FaGoogle size="2em" /></a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">Don't have an account? 
                  <Link to="/signup" className="text-white-50 fw-bold"> Sign Up</Link>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
