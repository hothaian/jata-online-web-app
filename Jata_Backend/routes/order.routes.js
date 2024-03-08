module.exports = app => {
    const orders = require("../controllers/order.controller");
    
    var router = require("express").Router();
    router.get("/category", orders.findTotalOrderByCategory);
    router.get("/top-buyer", orders.findTopBuyer);
    // Create a new Order
    // {
    //   "buyer_id": 1,
    //   "total_price": "31.98",
    //   "shipping_address": {
    //       "user_id": 1,
    //     "street_address": "123 Tacoma Tacoma TTacomaacoma St",
    //     "city": "Tacoma",
    //     "state": "NY",
    //     "zip_code": "10001",
    //     "country": "USA"
    //   },
    //   "items": [
    //     {
    //       "quantity": 2,
    //       "sellpost_id": 2
    //     },
    //     {
    //       "quantity": 1,
    //       "sellpost_id": 1
    //     }
    //   ]
    // }
/**
 *  @swagger
 *  /api/orders:
 *    post:
 *      summary: Create a new order
 *      description: Create a new order with the provided details.
 *      tags:
 *        - Order
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                buyer_id:
 *                  type: integer
 *                total_price:
 *                  type: string
 *                shipping_address:
 *                  type: object
 *                  properties:
 *                    user_id:
 *                      type: integer
 *                    street_address:
 *                      type: string
 *                    city:
 *                      type: string
 *                    state:
 *                      type: string
 *                    zip_code:
 *                      type: string
 *                    country:
 *                      type: string
 *                items:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      quantity:
 *                        type: integer
 *                      sellpost_id:
 *                        type: integer
 *      responses:
 *        "201":
 *          description: Success message indicating that the order was created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Order created successfully"
 *                  order:
 *                    type: object
 *                    properties:
 *                      order_shipping_state:
 *                        type: string
 *                        example: "Pending"
 *                      order_id:
 *                        type: integer
 *                        example: 3
 *                      buyer_id:
 *                        type: integer
 *                        example: 1
 *                      total_price:
 *                        type: string
 *                        example: "31.98"
 *                      updatedAt:
 *                        type: string
 *                        format: date-time
 *                        example: "2024-03-06T21:05:45.987Z"
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                        example: "2024-03-06T21:05:45.987Z"
 *        "500":
 *          description: Error message indicating an internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Internal server error"
 */

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

  // capture an order
  router.post("/capture", orders.capture);

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

    router.get("/", orders.getAllOrders );
  
    // Retrieve a single Order by id

 /**
 *  @swagger
 *  /api/orders/{order_id}:
 *    get:
 *      summary: Get order by ID
 *      description: Retrieve a single order by its ID with detailed information.
 *      tags:
 *        - Order
 *      parameters:
 *        - in: path
 *          name: order_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric ID of the order to retrieve
 *      responses:
 *        "200":
 *          description: JSON response containing the order details
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  order:
 *                    type: object
 *                    properties:
 *                      order_id:
 *                        type: integer
 *                      buyer_id:
 *                        type: integer
 *                      total_price:
 *                        type: string
 *                      order_shipping_state:
 *                        type: string
 *                      shipping_address_id:
 *                        type: integer
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                      updatedAt:
 *                        type: string
 *                        format: date-time
 *                      buyer:
 *                        type: object
 *                        properties:
 *                          user_id:
 *                            type: integer
 *                          username:
 *                            type: string
 *                          email:
 *                            type: string
 *                          role_id:
 *                            type: integer
 *                          first_name:
 *                            type: string
 *                          last_name:
 *                            type: string
 *                          gender:
 *                            type: string
 *                          date_of_birth:
 *                            type: string
 *                            format: date-time
 *                          profile_pictureUrl:
 *                            type: string
 *                          createdAt:
 *                            type: string
 *                            format: date-time
 *                          updatedAt:
 *                            type: string
 *                            format: date-time
 *                      shipping_address:
 *                        type: object
 *                        properties:
 *                          address_id:
 *                            type: integer
 *                          user_id:
 *                            type: integer
 *                          street_address:
 *                            type: string
 *                          city:
 *                            type: string
 *                          state:
 *                            type: string
 *                          zip_code:
 *                            type: string
 *                          country:
 *                            type: string
 *                          createdAt:
 *                            type: string
 *                            format: date-time
 *                          updatedAt:
 *                            type: string
 *                            format: date-time
 *                      items:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: integer
 *                            order_id:
 *                              type: integer
 *                            quantity:
 *                              type: integer
 *                            sellpost_id:
 *                              type: integer
 *                            createdAt:
 *                              type: string
 *                              format: date-time
 *                            updatedAt:
 *                              type: string
 *                              format: date-time
 *                            sellpost:
 *                              type: object
 *                              properties:
 *                                sellpost_id:
 *                                  type: integer
 *                                seller_id:
 *                                  type: integer
 *                                item_name:
 *                                  type: string
 *                                description:
 *                                  type: string
 *                                price:
 *                                  type: string
 *                                size:
 *                                  type: string
 *                                gender:
 *                                  type: string
 *                                color:
 *                                  type: string
 *                                brand:
 *                                  type: string
 *                                picUrl:
 *                                  type: string
 *                                condition:
 *                                  type: string
 *                                createdAt:
 *                                  type: string
 *                                  format: date-time
 *                                updatedAt:
 *                                  type: string
 *                                  format: date-time
 *        "404":
 *          description: Order not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Order not found"
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Internal server error"
 */
  
    router.get("/:orderId", orders.getOrder);
  
    // Update a Order by id
/**
 *  @swagger
 *  /api/orders/{order_id}:
 *    put:
 *      summary: Update an order
 *      description: Update an existing order with the provided details.
 *      tags:
 *        - Order
 *      parameters:
 *        - in: path
 *          name: order_id
 *          required: true
 *          description: ID of the order to update
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                seller_id:
 *                  type: integer
 *                buyer_id:
 *                  type: integer
 *                sellpost_id:
 *                  type: integer
 *                quantity:
 *                  type: integer
 *                total_price:
 *                  type: string
 *                order_shipping_state:
 *                  type: string
 *                shipping_address:
 *                  type: object
 *                  properties:
 *                    street_address:
 *                      type: string
 *                    city:
 *                      type: string
 *                    state:
 *                      type: string
 *                    zip_code:
 *                      type: string
 *                    country:
 *                      type: string
 *      responses:
 *        "200":
 *          description: Success message indicating that the order was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Order was updated successfully."
 *        "404":
 *          description: Error message indicating that the order was not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Cannot update Order with id={order_id}. Maybe Order was not found or req.body is empty!"
 *        "500":
 *          description: Error message indicating an internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Error updating Order with id={order_id}"
 */


    router.put("/:orderId", orders.updateOrder);



  
    // Delete a Order by id
   // router.delete("/:orderId", orders.delete);
  
    // Delete all Orders
  //  router.delete("/", orders.deleteAll);
  
    app.use('/api/orders', router);
  };
  
