import React, { useState, useEffect } from "react";
import { listAll, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../firebase/firebase";

const ImageUploader = ({ onUploadComplete }) => {
  const { currentUser } = useAuth();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Reset the uploaded image URL when currentUser changes
    setUploadedImageUrl(null);
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Add file type validation
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
      setError("Please select a valid image file.");
      setSuccessMessage(null);
    }
  };

  const handleUpload = async () => {
    try {
      setError(null);
      setLoading(true);

      if (selectedImage) {
        const storageRef = ref(
          storage,
          `images/${currentUser.uid}/${selectedImage.name}`
        );
        await uploadBytes(storageRef, selectedImage);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        setSelectedImage(null);

        // Set the uploaded image URL to display
        setUploadedImageUrl(downloadURL);

        // Update the uploaded_url prop in the parent component
        onUploadComplete(downloadURL);
        // Show success message
        setSuccessMessage("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error uploading image. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Add Image For Sell Post:</p>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload} disabled={!selectedImage || loading}>
          Upload Image
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {uploadedImageUrl && (
        <img
          src={uploadedImageUrl}
          alt="Uploaded Image"
          style={{ maxWidth: "300px", margin: "10px" }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
