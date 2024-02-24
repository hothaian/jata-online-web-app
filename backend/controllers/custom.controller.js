// Import user and sellpost controllers
const db = require("../models/connection");
const User = db.User;
const SellPost = db.SellPost;
// Define your custom controller functions
//demo for custom.
///api/custom/3/4
//import two db entities: db.User and db.SellPost
const customController = {
  // Custom function that utilizes user and sellpost controllers
  customFunction: async (req, res) => {
    try {
      // Call functions from user and sellpost controllers as needed
      const sellpostData = await SellPost.findByPk(req.params.sellpostId);

      const userData = await User.findByPk(req.params.userId);

      // Process data and send response 
      res.status(200).json({ userData, sellpostData });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
    }
  },
  anotherFuntion: async (req, res) => {
    
    try {
      //code here
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
    }
    //go to custom.routes.js to create rounte for this one.
  },
  // Add more custom functions as needed
};

module.exports = customController;
