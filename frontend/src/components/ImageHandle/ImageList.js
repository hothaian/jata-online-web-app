/**
 * Author: An  Ho
 */
import React, { useState, useEffect } from 'react';
import { listAll, getDownloadURL, ref } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext'; 
import { storage } from '../../firebase/firebase';

const ImageList = () => {
  const { currentUser } = useAuth();
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (currentUser) {
          const imagesRef = ref(storage, `images/${currentUser.uid}`); // Replace 'images' with your folder name
          const imageList = await listAll(imagesRef);

          const urlsPromises = imageList.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return url;
          });

          const urls = await Promise.all(urlsPromises);
          setImageUrls(urls);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [currentUser]);

  return (
    <div>
      <p></p>
      <p>Image List (Get from Storage base on User ID (currentUser.uid))</p>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index}`} style={{ maxWidth: '300px', margin: '10px' }} />
      ))}
    </div>
  );
};

export default ImageList;
