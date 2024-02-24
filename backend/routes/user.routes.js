module.exports = app => {
    const user = require("../controllers/user.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    // BODY:
    // {
    //   "username": "phuhuutin",
    //   "email": "john@example.com",
    //   "role_id": 1,
    //   "first_name": "Tin",
    //   "last_name": "Doe",
    //   "gender": "Male",
    //   "date_of_birth": "1990-05-15T00:00:00.000Z",
    //   "profile_pictureUrl": "https://img.freepik.com/free-photo/portrait-friendly-looking-happy-attractive-male-model-with-moustache-beard-wearing-trendy-transparent-glasses-smiling-broadly-while-listening-interesting-story-waiting-mom-give-meal_176420-22400.jpg",
    //   "address": {
    //           "street_address": "123 Main St",
    //           "city": "Tacoma",
    //           "state": "NY",
    //           "zip_code": "10001",
    //           "country": "USA"
    //       }
    // }
    router.post("/", user.create);
  
    // Retrieve all user
    router.get("/", user.findAll);
  

  
    // Retrieve a single user with id
    router.get("/:userId", user.findOne);
  
    // Update a user with id
    router.put("/:userId", user.update);
  
    // Delete a user with id
    router.delete("/:userId", user.delete);
  
    // Delete all user
    router.delete("/", user.deleteAll);
  
    app.use('/api/user', router);
  };