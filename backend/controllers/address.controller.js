const db = require("../models/connection");
const Address = db.Address;

// Create and Save a new Address
exports.create = (req, res) => {
  // Validate request
  if (!req.body.street_address || !req.body.city || !req.body.state || !req.body.zip_code || !req.body.country || !req.body.user_id) {
    res.status(400).send({
      message: "Street address, city, state, zip code, country, and user ID cannot be empty!"
    });
    return;
  }

  // Create an Address
  const address = {
    user_id: req.body.user_id,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    country: req.body.country
  };

  // Save Address in the database
  Address.create(address)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Address."
      });
    });
};

// Retrieve all Addresses from the database.
exports.findAll = (req, res) => {
  Address.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving addresses."
      });
    });
};

// Find a single Address with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Address.findByPk(id,{include: 'user'})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Address with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Address with id=" + id
      });
    });
};

// Update an Address by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Address.update(req.body, {
    where: { address_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Address was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Address with id=${id}. Maybe Address was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Address with id=" + id
      });
    });
};

// Delete an Address with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Address.destroy({
    where: { address_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Address was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Address with id=${id}. Maybe Address was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Address with id=" + id
      });
    });
};

// Delete all Addresses from the database.
exports.deleteAll = (req, res) => {
  Address.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Addresses were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Addresses."
      });
    });
};
