module.exports = app => {
    const sellpost = require("../controllers/sellpost.controller.js");
  
    var router = require("express").Router();
  
    // Create a new sellpost
    //BODY
  //   {
  //     "seller_id": 2,
  //     "item_name": "SneakersSneakers",
  //     "description": "Running shoes",
  //     "price": "59.99",
  //     "quantity": 50,
  //     "size": "10",
  //     "gender": "Male",
  //     "color": "White",
  //     "brand": "Adidas",
  //     "picUrl": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i99RDk1ZU0CA/v2/-1x-1.jpg",
  //     "condition": "New",
  //     "createdAt": "2024-02-11T22:09:00.000Z",
  //     "updatedAt": "2024-02-11T22:09:00.000Z",
  //     "categoryNames": ["Shoes","Men"]
      
  // }
    router.post("/", sellpost.create);
  
    // Retrieve all sellposts
    router.get("/", sellpost.findAll);
  
    // Retrieve a single sellpost with id
    router.get("/:sellpostId", sellpost.findOne);
  
    // Update a sellpost with id
    router.put("/:sellpostId", sellpost.update);
  
    // Delete a sellpost with id
    router.delete("/:sellpostId", sellpost.delete);
  
    // Delete all sellposts
    router.delete("/", sellpost.deleteAll);
  
    app.use('/api/sellposts', router);
  };
  