/**
 * Author: An Ho
 */
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import APIConfig from "../APIConfig";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = APIConfig.firebaseConfig

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(); //for big file, images
export const db = getFirestore();

