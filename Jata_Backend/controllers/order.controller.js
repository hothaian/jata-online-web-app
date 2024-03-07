const db = require("../models/connection");
const Order = db.Order;
const User = db.User;
const Address = db.Address;
const OrderedItem = db.OrderedItem;
const SellPost = db.SellPost;
const Category = db.Category;

const sequelize = db.sequelize;

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { buyer_id, total_price, shipping_address, items } = req.body;
    console.log(items);
    // Create shipping address
    const address = await Address.create(shipping_address);

    // Create order
    const order = await Order.create({
      buyer_id: buyer_id,
      total_price: total_price,
      shipping_address_id: address.id,
    });

    // Create ordered items
    await Promise.all(
      items.map(async (item) => {
        await OrderedItem.create({
          order_id: order.order_id,
          quantity: item.quantity,
          sellpost_id: item.sellpost_id,
        });
      })
    );

    res.status(201).send({ message: "Order created successfully", order });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Get a single order by ID
exports.getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: User,
          as: "buyer",
        },
        {
          model: Address,
          as: "shipping_address",
        },
        {
          model: OrderedItem,
          as: "items",
          include: [
            {
              model: SellPost,
              as: "sellpost",
              attributes: { exclude: ['quantity'] }, // Exclude the 'quantity' attribute
            },
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).send({ order });
  } catch (err) {
    console.error("Error getting order:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "buyer",
        },
        {
          model: Address,
          as: "shipping_address",
        },
        {
          model: OrderedItem,
          as: "items",
          include: [
            {
              model: SellPost,
              as: "sellpost",
              attributes: { exclude: ['quantity'] }, // Exclude the 'quantity' attribute

            },
          ],
        },
      ],
    });

    res.status(200).send({ orders });
  } catch (err) {
    console.error("Error getting orders:", err);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { buyerId, shippingAddressId } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    await order.update({
      buyer_id: buyerId,
      shipping_address_id: shippingAddressId,
    });

    res.status(200).send({ message: "Order updated successfully", order });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).send({ message: "Internal server error" });
  }
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