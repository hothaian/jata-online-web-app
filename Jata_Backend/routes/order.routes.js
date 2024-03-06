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
 *              required:
 *                - buyer_id
 *                - sellpost_id
 *                - quantity
 *                - total_price
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
 *          description: JSON response containing the list of orders
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    order_id:
 *                      type: integer
 *                    seller_id:
 *                      type: integer
 *                    buyer_id:
 *                      type: integer
 *                    sellpost_id:
 *                      type: integer
 *                    quantity:
 *                      type: integer
 *                    total_price:
 *                      type: string
 *                    order_shipping_state:
 *                      type: string
 *                    shipping_address_id:
 *                      type: integer
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *                    seller:
 *                      $ref: '#/definitions/User'
 *                    buyer:
 *                      $ref: '#/definitions/User'
 *                    shipping_address:
 *                      $ref: '#/definitions/Address'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Some error occurred while retrieving orders."
 */






    router.post("/", orders.createOrder);
  
/**
 *  @swagger
 *  /api/orders:
 *    get:
 *      summary: Get all orders
 *      description: Retrieve a list of all orders.
 *      tags:
 *        - Order
 *      responses:
 *        "200":
 *          description: JSON response containing the list of orders
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    order_id:
 *                      type: integer
 *                    seller_id:
 *                      type: integer
 *                    buyer_id:
 *                      type: integer
 *                    sellpost_id:
 *                      type: integer
 *                    quantity:
 *                      type: integer
 *                    total_price:
 *                      type: string
 *                    order_shipping_state:
 *                      type: string
 *                    shipping_address_id:
 *                      type: integer
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *                    seller:
 *                      $ref: '#/definitions/User'
 *                    buyer:
 *                      $ref: '#/definitions/User'
 *                    shipping_address:
 *                      $ref: '#/definitions/Address'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Some error occurred while retrieving orders."
 */



    router.get("/", orders.getAllOrders );
  
    // Retrieve a single Order by id

  /**
 *  @swagger
 *  /api/orders/{order_id}:
 *    get:
 *      summary: Get a single order by ID
 *      description: Retrieve a single order by its ID.
 *      tags:
 *        - Order
 *      parameters:
 *        - in: path
 *          name: order_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Numeric ID of the order to retrieve
 *      responses:
 *        "200":
 *          description: JSON response containing the order details
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/OrderWithDetails'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Error retrieving Order with id=1"
 */

/**
 *  @swagger
 *  definitions:
 *    OrderWithDetails:
 *      type: object
 *      properties:
 *        order_id:
 *          type: integer
 *        seller:
 *          $ref: '#/definitions/User'
 *        buyer:
 *          $ref: '#/definitions/User'
 *        shipping_address:
 *          $ref: '#/definitions/Address'
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *    User:
 *      type: object
 *      properties:
 *        user_id:
 *          type: integer
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        role_id:
 *          type: integer
 *        first_name:
 *          type: string
 *        last_name:
 *          type: string
 *        gender:
 *          type: string
 *        date_of_birth:
 *          type: string
 *          format: date-time
 *        profile_pictureUrl:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *    Address:
 *      type: object
 *      properties:
 *        address_id:
 *          type: integer
 *        user_id:
 *          type: integer
 *        street_address:
 *          type: string
 *        city:
 *          type: string
 *        state:
 *          type: string
 *        zip_code:
 *          type: string
 *        country:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
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
  