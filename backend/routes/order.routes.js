module.exports = app => {
    const orders = require("../controllers/order.controller");
    
    var router = require("express").Router();
  
    // Create a new Order
    //Body
    //{
    // "seller_id": 1,
    // "buyer_id": 3,
    // "sellpost_id": 1,
    // "quantity": 2,
    // "total_price": "31.98",
    // "order_shipping_state": "Shipped",
    // "shipping_address": {
    //     "street_address": "123 Tacoma Tacoma TTacomaacoma St",
    //     "city": "Tacoma",
    //     "state": "NY",
    //     "zip_code": "10001",
    //     "country": "USA"
    // }
    // }
    router.post("/", orders.create);
  
    // Retrieve all Orders
    router.get("/", orders.findAll);
  
    // Retrieve a single Order by id
    router.get("/:orderId", orders.findOne);
  
    // Update a Order by id
    router.put("/:orderId", orders.update);
  
    // Delete a Order by id
    router.delete("/:orderId", orders.delete);
  
    // Delete all Orders
    router.delete("/", orders.deleteAll);
  
    app.use('/api/orders', router);
  };
  