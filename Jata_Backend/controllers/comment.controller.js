// comment.controller.js
const db = require("../models/connection.js");
const Comment = db.Comment;
const User = db.User;

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id || !req.body.description || !req.body.sellpost_id) {
    res.status(400).send({ message: "User ID, description, and post ID can not be empty!" });
    return;
  }

  // Create a Comment
  const comment = {
    user_id: req.body.user_id,
    description: req.body.description,
    sellpost_id: req.body.sellpost_id
  };

  // Save Comment in the database
  Comment.create(comment)
    .then(data => {
          Comment.findByPk(data.comment_id,{
            include: [
              {
                model: User,
                as: 'user', // Include the user who posted the post
              }
            ]
          })
          .then(commentData => {
            console.log(commentData);
            res.send(commentData);
          })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    });
};

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
  Comment.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    });
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
  const commentId = req.params.commentId;

  Comment.findByPk(commentId, {
    include: [
      {
        model: User,
        as: 'user', // Include the user who posted the post
      }
    ]
  })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Comment with id " + commentId });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Comment with id=" + commentId });
    });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
  const commentId = req.params.commentId;

  Comment.update(req.body, {
    where: { comment_id: commentId }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Comment was updated successfully." });
      } else {
        res.send({ message: `Cannot update Comment with id=${commentId}. Maybe Comment was not found or req.body is empty!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating Comment with id=" + commentId });
    });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  const commentId = req.params.commentId;

  Comment.destroy({
    where: { comment_id: commentId }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Comment was deleted successfully!" });
      } else {
        res.send({ message: `Cannot delete Comment with id=${commentId}. Maybe Comment was not found!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Comment with id=" + commentId });
    });
};

// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
  Comment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Comments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all comments."
      });
    });
};
