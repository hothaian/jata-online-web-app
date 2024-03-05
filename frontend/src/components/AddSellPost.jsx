import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploader from "./ImageHandle/ImageUploader";
import axios from "axios";

const AddSellPost = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    seller_id: 2,
    item_name: "",
    description: "",
    price: "",
    quantity: 0,
    size: "",
    gender: "",
    color: "",
    brand: "",
    picUrl: "pictureurl", // Update with actual image URL
    condition: "",
    categoryNames: ["Shoe"],
  });

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8080/api/sellposts",
        formData,{        headers: {
            'Content-Type': 'application/json',
          },}
      );

      if (response.status === 200) {
        // Handle successful response (e.g., show a success message)
        console.log("Sell post submitted successfully!");
        handleClosePopup();
      } else {
        // Handle error response (e.g., show an error message)
        console.error("Failed to submit sell post:", response.statusText);
      }
      handleClosePopup();
    } catch (error) {
      console.error("Error submitting sell post:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      categoryNames: value.split(",").map((category) => category.trim()),
    }));
  };


  const handleUploadComplete = (downloadURL) => {
    // Update the picUrl in formData with the downloaded image URL
    setFormData((prevData) => ({
      ...prevData,
      picUrl: downloadURL,
    }));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={handleOpenPopup} color="primary" variant="contained">
        Add Sell Post
      </Button>
      <Dialog open={open} onClose={handleClosePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          New Sell Post
          <IconButton onClick={handleClosePopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label="Item Name"
              name="item_name"
              value={formData.item_name}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              label="Size"
              name="size"
              value={formData.size}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              label="Condition"
              name="condition"
              value={formData.condition}
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              label="Category Names (comma-separated)"
              name="categoryNames"
              value={formData.categoryNames.join(", ")}
              onChange={handleCategoryChange}
            />

            <ImageUploader onUploadComplete={handleUploadComplete} />
            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" />}
              label="Agree terms & conditions"
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>{/* Add additional actions if needed */}</DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSellPost;
