module.exports = (app) => {
    const category = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Category
    router.post("/", category.create);
  
    // Retrieve all Categories
    router.get("/", category.findAll);
  
    // Retrieve a single Category with id
    router.get("/:categoryId", category.findOne);
  
    // Update a Category with id
    router.put("/:categoryId", category.update);
  
    // Delete a Category with id
    router.delete("/:categoryId", category.delete);
  
    // Delete all Categories
    router.delete("/", category.deleteAll);
  
    // Add a SellPost to a Category
    router.post("/:categoryId/sellposts/:sellpostId", category.addSellPost);
  
    // Remove a SellPost from a Category
    router.delete("/:categoryId/sellposts/:sellpostId", category.removeSellPost);
  
    app.use('/api/category', router);
  };
  