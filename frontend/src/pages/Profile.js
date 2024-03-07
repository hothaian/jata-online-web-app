/**
 * Author: An Ho
 */
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageHandle/ImageUploader';
import ImageList from '../components/ImageHandle/ImageList';
import PieChart from '../components/Charts/PieChart';
import DashBoard from './DashBoard';
import AddSellPost from '../components/AddSellPost';


const Profile = () => {
  const { currentUser,userLoggedIn,loading } = useAuth();
  
  const navigate = useNavigate();

  const userDisplayName = currentUser.displayName
  const userID = currentUser.user_id
  const userEmail= currentUser.email
  //prevent user from getting to Profile without login
  useEffect(()=>{
    if(!loading && !userLoggedIn){
      navigate('/');
    }
    console.log("🚀 ~ Profile ~  currentUser:",  currentUser)
  },[userLoggedIn, loading])




  return (
    <div>
      {userLoggedIn ? (
        <>
          <h2>User Profile</h2>
          <p>
            <strong>Display Name:</strong> {userDisplayName}
            
          </p>
          <p>
          <strong> User ID:</strong> {userID ? userID : 'Not Found in MySQL Database'}
            
          </p>
          <p>
            <strong>Email:</strong> {userEmail}
          </p>


          <AddSellPost/>
          <DashBoard/>
        </>
      ) : null}

    </div>

  )};
  

export default Profile;
