/**
 * Author: An Ho
 */
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageHandle/ImageUploader';
import ImageList from '../components/ImageHandle/ImageList';


const Profile = () => {
  const { currentUser,userLoggedIn,loading } = useAuth();
  const navigate = useNavigate();

  //prevent user from getting to Profile without login
  useEffect(()=>{
    if(!loading && !userLoggedIn){
      navigate('/');
    }
  },[userLoggedIn, loading])




  return (
    <div>
      {userLoggedIn ? (
        <>
          <h2>User Profile</h2>
          <p>
            <strong>Display Name:</strong> {currentUser.displayName}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>

          
          <ImageUploader/>
          <ImageList/>
        </>
      ) : null}

    </div>

  )};
  

export default Profile;
