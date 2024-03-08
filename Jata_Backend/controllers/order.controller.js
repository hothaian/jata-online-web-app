const fetch = require("node-fetch");
const db = require("../models/connection");
const Order = db.Order;
const Address = db.Address;
const OrderedItem = db.OrderedItem;
const SellPost = db.SellPost;
const Category = db.Category;

const sequelize = db.sequelize;

// Create a new order
exports.create = async (req, res) => {
  try {
    // Validate request
    if (
      req.body.buyer_id === undefined ||
      req.body.sellpost_id === undefined ||
      req.body.quantity === undefined ||
      req.body.total_price === undefined
    ) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // // Check if seller and buyer exist
    // const [seller, buyer] = await Promise.all([
    //   User.findByPk(req.body.seller_id),
    //   User.findByPk(req.body.buyer_id),
    // ]);

    // if (!seller) {
    //   return res.status(404).json({ message: "Seller not found" });
    // }

    // if (!buyer) {
    //   return res.status(404).json({ message: "Buyer not found" });
    // }
    const shipping_address = req.body.shipping_address;
    shipping_address.user_id = req.body.buyer_id;
    // Find or create the shipping address
    // const [shippingAddress, created] = await Address.findOrCreate({
    //   where: shipping_address,
    //   defaults: shipping_address, // Use the provided shipping_address as default values if the address is created
    // });
    // Create an Order object
    const postedorder = {
      seller_id: req.body.seller_id,
      buyer_id: req.body.buyer_id,
      sellpost_id: req.body.sellpost_id,
      quantity: req.body.quantity,
      total_price: req.body.total_price,
      order_shipping_state: req.body.order_shipping_state || "Pending",
      // shipping_address_id: shippingAddress.address_id,
      shipping_address_id: 1,
    };

    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: postedorder.total_price,
          },
        },
      ],
    };

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    const { httpStatusCode, jsonResponse } = await handleResponse(response);

    // use the correct id fields, and save the order in the db
    // const order = await Order.create(postedorder);

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Error creating SellPost:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.capture = async (req, res) => {
  try {
    const { orderID } = req.body;
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { jsonResponse, httpStatusCode } = await handleResponse(response);

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};

// Retrieve all orders from the database
exports.findAll = (req, res) => {
  Order.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single order with an id
exports.findOne = (req, res) => {
  const id = req.params.orderId;

  // Order.findByPk(id)
  Order.findByPk(id, { include: ["seller", "buyer", "shipping_address"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id,
      });
    });
};

// Update an order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { order_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with id=" + id,
      });
    });
};

// Delete an order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { order_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
      });
    });
};

// Delete all orders from the database
exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Orders were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders.",
      });
    });
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    await order.destroy();

    res.status(200).send({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};


//An Ho - SQL Querry
exports.findTotalOrderByCategory = (req, res) => {
  sequelize.query(
    `SELECT c.category_name, COUNT(o.order_id) AS order_count
    FROM jatadata.category c
    JOIN jatadata.sellpostcategory sc ON c.category_id = sc.category_id
    JOIN jatadata.order o ON sc.sellpost_id = o.sellpost_id
    GROUP BY c.category_name;`,
    { type: sequelize.QueryTypes.SELECT }
  )
  .then(data => {
    res.status(200).json({      
      message: 'Orders grouped by category retrieved successfully',
      data: data
    });
  })
  .catch(err => {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving orders grouped by category',
      error: err.message
    });
  });
};

exports.findTopBuyer= (req, res) => {
  sequelize.query(
    `SELECT
    u.username AS buyer_username,
    o.buyer_id,
    SUM(o.total_price) AS total_spending
    
  FROM
    jatadata.order o
  JOIN
    jatadata.user u ON o.buyer_id = u.user_id
  GROUP BY
    o.buyer_id
  ORDER BY
    total_spending DESC
  LIMIT 5;`,
    { type: sequelize.QueryTypes.SELECT }
  )
  .then(data => {
    res.status(200).json({      
      message: 'Orders grouped by category retrieved successfully',
      data: data
    });
  })
  .catch(err => {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving orders grouped by category',
      error: err.message
    });
  });
};
