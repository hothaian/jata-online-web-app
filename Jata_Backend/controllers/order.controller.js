const db = require("../models/connection");
const Order = db.Order;
const Address = db.Address;
const User = db.User;

// Create a new order
exports.create = async (req, res) => {
  try{
  // Validate request
  if (!req.body.buyer_id || !req.body.sellpost_id || !req.body.quantity || !req.body.total_price) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Check if seller and buyer exist
  const [seller, buyer] = await Promise.all([
    User.findByPk(req.body.seller_id),
    User.findByPk(req.body.buyer_id)
  ]);

  if (!seller) {
    return res.status(404).json({ message: 'Seller not found' });
  }

  if (!buyer) {
    return res.status(404).json({ message: 'Buyer not found' });
  }
  const shipping_address = req.body.shipping_address;
  shipping_address.user_id = req.body.buyer_id;
  // Find or create the shipping address
  const [shippingAddress, created] = await Address.findOrCreate({
    where: shipping_address,
    defaults: shipping_address // Use the provided shipping_address as default values if the address is created
  });
  // Create an Order object
  const postedorder = {
    seller_id: req.body.seller_id,
    buyer_id: req.body.buyer_id,
    sellpost_id: req.body.sellpost_id,
    quantity: req.body.quantity,
    total_price: req.body.total_price,
    order_shipping_state: req.body.order_shipping_state || "Pending",
    shipping_address_id: shippingAddress.address_id
  };

  // Save Order in the database
    const order = await Order.create(postedorder);
    Order.findByPk(order.order_id, {include: ['seller','buyer','shipping_address']})
      .then(data => {
        res.status(201).json({ message: 'Order created successfully', data});
      })
   
  }catch (error) {
      console.error('Error creating SellPost:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve all orders from the database
exports.findAll = (req, res) => {
  Order.findAll({include: ['seller','buyer','shipping_address']})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    });
};

// Find a single order with an id
exports.findOne = (req, res) => {
  const id = req.params.orderId;

 // Order.findByPk(id)
  Order.findByPk(id, {include: ['seller','buyer','shipping_address']})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id
      });
    });
};

// Update an order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { order_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Order with id=" + id
      });
    });
};

// Delete an order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { order_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id
      });
    });
};

// Delete all orders from the database
exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Orders were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders."
      });
    });
};
