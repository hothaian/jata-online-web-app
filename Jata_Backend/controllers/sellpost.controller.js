const db = require("../models/connection");
const SellPost = db.SellPost;
const Category = db.Category;
const User = db.User;
const Comment = db.Comment;
// Create and Save a new SellPost
exports.create = async (req, res) => {
  try {
  // Validate request
    
  if (!req.body.item_name || !req.body.price || !req.body.quantity|| !req.body.picUrl) {
    res.status(400).send({
      message: "Item name, price, and quantity cannot be empty!"
    });
    return;
  }
  const user = await User.findByPk(req.body.seller_id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
 
  // Create a SellPost
  const tempsellPost = {
    seller_id: req.body.seller_id,
    item_name: req.body.item_name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    size: req.body.size,
    gender: req.body.gender,
    color: req.body.color,
    brand: req.body.brand,
    condition: req.body.condition,
    picUrl: req.body.picUrl
    // Do not include created_at, let the database handle it automatically
  };

  const categoryNames = req.body.categoryNames;
  

  // Save SellPost in the database
  const sellPost = await SellPost.create(tempsellPost);
  //Create or find categories and associate them with the SellPost
  const categories = await Promise.all(categoryNames.map(name => {
    // Find or create the category
    return Category.findOrCreate({ where: { category_name: name } });
  }));
  // Extract the category instances from the result of Promise.all
  const categoryInstances = categories.map(([category]) => category);
  await sellPost.addCategories(categoryInstances);
  res.status(201).json({ message: 'SellPost created successfully', sellPost });
  } catch (error) {
  console.error('Error creating SellPost:', error);
  res.status(500).json({ message: 'Internal server error' });
}
};

// Retrieve all SellPosts from the database.
exports.findAll = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default to 5 sellposts per page
  const offset = (page - 1) * limit;
  
  SellPost.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving SellPosts."
    });
  });
};

// Find a single SellPost with an id
exports.findOne = (req, res) => {
  const id = req.params.sellpostId;

  SellPost.findByPk(id, {
    include:['seller',
      {
        model: Category,
        as: 'categories' // Specify the alias used in the association
      },
      {
        model: Comment,
        as: 'comments', // Alias for the comments association
        include: [
          {
            model: User,
            as: 'user', // Alias for the user association of the comment
          }
        ]
      }
    ]
  })
    .then(data => {
      if (data) {
        res.send(data);
        console.log(data);
      } else {
        res.status(404).send({
          message: `Cannot find SellPost with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SellPost with id=" + id
      });
    });
};

// Update a SellPost by the id in the request
exports.update = (req, res) => {
  const id = req.params.sellpostId;

  // Check if req.body is empty
  if (!req.body) {
    res.status(400).send({
      message: "Data to update cannot be empty!"
    });
    return;
  }

  // Update SellPost in the database
  SellPost.update(req.body, {
    where: { sellpost_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SellPost was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update SellPost with id=${id}. SellPost not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating SellPost with id=" + id
      });
    });
};

// Delete a SellPost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.sellpostId;

  SellPost.destroy({
    where: { sellpost_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SellPost was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete SellPost with id=${id}. SellPost not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete SellPost with id=" + id
      });
    });
};

// Delete all SellPosts from the database.
exports.deleteAll = (req, res) => {
  SellPost.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} SellPosts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all SellPosts."
      });
    });
};

// find all SellPosts with published status
exports.findAllPublished = (req, res) => {
  SellPost.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving published SellPosts."
      });
    });
};
