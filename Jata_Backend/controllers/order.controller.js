const db = require("../models/connection");
const Order = db.Order;
const User = db.User;
const Address = db.Address;
const OrderedItem = db.OrderedItem;
const SellPost = db.SellPost;

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
      shipping_address_id: address.address_id,
    });

    // Create ordered items
    await Promise.all(
      items.map(async (item) => {
        await OrderedItem.create({
          order_id: order.order_id,
          quantity: item.quantity,
          sellpost_id: item.sellpost_id,
        });

        // Update SellPost quantity
        const sellPost = await SellPost.findByPk(item.sellpost_id);
        if (sellPost) {
          // Decrease the quantity by the ordered quantity
          await sellPost.update({ quantity: sellPost.quantity - item.quantity });
        } else {
          throw new Error(`SellPost with ID ${item.sellpost_id} not found.`);
        }
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