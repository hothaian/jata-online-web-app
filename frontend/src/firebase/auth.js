/**
 * Author: An Ho
 */

import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  linkWithPopup
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user; // Returning user object, not the userCredential
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
      // Sign in with email and password
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      console.log('Success Login!\nUser Email: ' + user.email);
  
      // Add user to Firestore or perform other actions
  
    } catch (error) {
      // Handle the "auth/account-exists-with-different-credential" error
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Get the current user
        const currentUser = auth.currentUser;
  
        // Create a GitHub provider for linking
        const githubProvider = new GithubAuthProvider();
  
        // Sign in with GitHub and link the accounts
        await linkWithPopup(currentUser, githubProvider).then((linkResult) => {
          // You can handle the result if needed
          console.log('Accounts successfully linked:', linkResult);
        }).catch((linkError) => {
          // Handle errors during linking
          console.error('Error linking accounts:', linkError);
        });
      } else {
        // Handle other errors
        console.error('Error signing in with email/password:', error.message);
      }
    }
  };

export const doSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      const user = result.user;
      console.log('Sucess Login! \nUser Email:' + user.email);
      console.log(user);
  
   
  
    } catch (error) {
      // Handle the error here
      console.error('Error signing in with Google:', error.message);
      alert('Failed to sign in with Google. Please try again.');
  

      throw error;
    }
  };;
  export const doSignInWithGithub = async () => {
    const provider = new GithubAuthProvider();
  
    try {
      // Sign in with GitHub
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user.email);
  
      // Add user to Firestore or perform other actions
  
    } catch (error) {
      // Handle the "account-exists-with-different-credential" error
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Get the current user
        const currentUser = auth.currentUser;
  
        // Sign in with GitHub and link the accounts
        await linkWithPopup(currentUser, provider).then((result) => {
          // You can handle the result if needed
          console.log('Accounts successfully linked:', result);
        }).catch((linkError) => {
          // Handle errors during linking
          console.error('Error linking accounts:', linkError);
        });
      } else {
        // Handle other errors
        console.error('Error signing in with GitHub:', error.message);
      }
    }
  };


export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};