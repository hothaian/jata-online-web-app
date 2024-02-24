const express = require('express');
const addressController = require('../controllers/address.controller');

module.exports = app => {
  const router = express.Router();

  // Create a new Address
  router.post("/", addressController.create);

  // Retrieve all Addresses
  router.get("/", addressController.findAll);

  // Retrieve a single Address with id
  router.get("/:id", addressController.findOne);

  // Update an Address with id
  router.put("/:id", addressController.update);

  // Delete an Address with id
  router.delete("/:id", addressController.delete);

  // Delete all Addresses
  router.delete("/", addressController.deleteAll);

  app.use('/api/address', router);
};
