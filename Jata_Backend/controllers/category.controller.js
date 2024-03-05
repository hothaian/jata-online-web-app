const db = require("../models/connection");
const Category = db.Category;
const SellPost = db.SellPost;

// Create and save a new category
exports.create = (req, res) => {
  const { category_name } = req.body;

  // Validate request
  if (!category_name) {
    res.status(400).send({ message: "Category name cannot be empty!" });
    return;
  }

  // Create a category
  const category = {
    category_name: category_name,
  };

  // Save category in the database
  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    });
};

// Retrieve all categories from the database
exports.findAll = (req, res) => {
  Category.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};

// Find a single category with an id
exports.findOne = (req, res) => {
  const id = req.params.categoryId;

  Category.findByPk(id,{
    include:[
      {
        model: SellPost,
        as: 'sellposts' // Specify the alias used in the association
      }
    ]
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Category with id=${id} not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Category with id=${id}: ${err.message}`,
      });
    });
};

// Update a category by the id in the request
exports.update = (req, res) => {
  const id = req.params.categoryId;

  Category.update(req.body, {
    where: { category_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Category with id=${id}: ${err.message}`,
      });
    });
};

// Delete a category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.categoryId;

  Category.destroy({
    where: { category_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Category with id=${id}: ${err.message}`,
      });
    });
};

// Delete all categories from the database
exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Categories were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories.",
      });
    });
};

// Add a sellpost to a category
exports.addSellPost = (req, res) => {
  const categoryId = req.params.categoryId;
  const sellpostId = req.params.sellpostId;

  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).send({ message: "Category not found." });
        return null;
      }
      return SellPost.findByPk(sellpostId).then((sellpost) => {
        if (!sellpost) {
          res.status(404).send({ message: "SellPost not found." });
          return null;
        }

        category.addSellPost(sellpost);
        res.send({ message: "SellPost added to Category successfully." });
        return category;
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error adding SellPost to Category.",
      });
    });
};

// Remove a sellpost from a category
exports.removeSellPost = (req, res) => {
  const categoryId = req.params.categoryId;
  const sellpostId = req.params.sellpostId;

  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).send({ message: "Category not found." });
        return null;
      }
      return SellPost.findByPk(sellpostId).then((sellpost) => {
        if (!sellpost) {
          res.status(404).send({ message: "SellPost not found." });
          return null;
        }

        category.removeSellPost(sellpost);
        res.send({ message: "SellPost removed from Category successfully." });
        return category;
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error removing SellPost from Category.",
      });
    });
};
