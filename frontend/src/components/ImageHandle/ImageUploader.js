/**
 * Author: An  Ho
 */
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext'; // Adjust the path based on your actual file structure
import { storage } from '../../firebase/firebase';

const ImageUploader = () => {
  const { currentUser } = useAuth();
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image && currentUser) {
      const storageRef = ref(storage, `images/${currentUser.uid}/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);

          // Reload the current page after successful upload
          window.location.reload();
        }
      );
    }
  };

  return (
    <div>
      <h2>Image Upload (FireBase Storage For Large File)</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <progress value={progress} max="100" />}
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />}
    </div>
  );
};

export default ImageUploader;
