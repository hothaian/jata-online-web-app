import React, { useState, useEffect } from 'react';
import { listAll, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../firebase/firebase';

const ImageUploader = () => {
  const { currentUser } = useAuth();
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // State for triggering refresh

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (currentUser) {
          const imagesRef = ref(storage, `images/${currentUser.uid}`);
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
  }, [currentUser, refreshKey]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    try {
      if (selectedImage) {
        const storageRef = ref(storage, `images/${currentUser.uid}/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        setSelectedImage(null);
        // Trigger a refresh of the ImageList component
        setRefreshKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <p></p>
      <p>Add Image For Sell Post:</p>
      <div>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload Image</button>
      </div>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index}`} style={{ maxWidth: '300px', margin: '10px' }} />
      ))}
    </div>
  );
};

export default ImageUploader;
