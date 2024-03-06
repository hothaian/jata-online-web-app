const db = require("../models/connection");
const User = db.User;
const Address = db.Address;
 
// Create and Save a new User
exports.create = async (req, res) => {
  try{
  // Validate request
  if (!req.body.username || !req.body.email) {
    res.status(400).send({
      message: "Username and Email cannot be empty!"
    });
    return;
  }
  if (!req.body.address.street_address || !req.body.address.city || !req.body.address.state || !req.body.address.zip_code || !req.body.address.country) {
    res.status(400).send({
      message: "Street address, city, state, zip code, country, and user ID cannot be empty!"
    });
    return;
  }
  

  // Create a User
  const user = {
    username: req.body.username,
    email: req.body.email,
    role_id: req.body.role_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
    profile_picture: req.body.profile_picture
  };

  // Save User in the database
  const postedUser = await User.create(user);

  const address = {
    street_address: req.body.address.street_address,
    city: req.body.address.city ,
    state: req.body.address.state ,
    zip_code: req.body.address.zip_code, 
    country:req.body.address.country,
    user_id: postedUser.user_id
  }

  const postedAddress = await Address.create(address);
  await postedUser.addAddresses(postedAddress);
  res.status(201).json({ message: 'User created successfully', postedUser });
  }catch(error) {
    console.error('Error creating User:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
 
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.userId;

  User.findByPk(id, { include: ['sellPosts', 'addresses'] }) // Include the associated sell posts
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({
          message: `User with id=${id} not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving User with id=${id}: ${err.message}`
      });
    });
};

exports.findOneByEmail = (req, res) => {
  const email = req.params.userEmail;

  User.findOne({
    where: {
      email: email
    }
  })
  .then(user => {
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({
        message: `User with email=${email} not found.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error retrieving User with email=${email}: ${err.message}`
    });
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.userId;

  User.update(req.body, {
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.userId;

  User.destroy({
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users."
      });
    });
};

