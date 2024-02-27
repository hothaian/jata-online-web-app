module.exports = app => {
    const comment = require("../controllers/comment.controller");
  
    var router = require("express").Router();

    
    router.post("/", comment.create);
  
    router.get("/", comment.findAll);
  
    // Retrieve a single comment with id
    router.get("/:commentId", comment.findOne);
  
    // Update a comment with id
    router.put("/:commentId", comment.update);
  
    // Delete a comment with id
    router.delete("/:commentId", comment.delete);
  
    // Delete all comment
    router.delete("/", comment.deleteAll);
  
    app.use('/api/comment', router);
  };