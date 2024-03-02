module.exports = app => {
    const sellpost = require("../controllers/sellpost.controller.js");
  
    var router = require("express").Router();
  
    // Create a new sellpost
    //BODY
  //   {
      // "seller_id": 2,
      // "item_name": "SneakersSneakers",
      // "description": "Running shoes",
      // "price": "59.99",
      // "quantity": 50,
      // "size": "10",
      // "gender": "Male",
      // "color": "White",
      // "brand": "Adidas",
      // "picUrl": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i99RDk1ZU0CA/v2/-1x-1.jpg",
      // "condition": "New",
      // "createdAt": "2024-02-11T22:09:00.000Z",
      // "updatedAt": "2024-02-11T22:09:00.000Z",
      // "categoryNames": ["Shoes","Men"]
      
  // }


  /**
 *  @swagger
 *  /api/sellposts/:
 *    post:
 *      summary: Create a sell post
 *      description: Create a new sell post with the provided details.
 *      tags:
 *        - SellPost
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                seller_id:
 *                  type: integer
 *                  example: 11
 *                item_name:
 *                  type: string
 *                  example: "NiKe T-Shirt"
 *                description:
 *                  type: string
 *                  example: "T-Shirt"
 *                price:
 *                  type: string
 *                  example: "59.99"
 *                quantity:
 *                  type: integer
 *                  example: 50
 *                size:
 *                  type: string
 *                  example: "10"
 *                gender:
 *                  type: string
 *                  example: "Male"
 *                color:
 *                  type: string
 *                  example: "White"
 *                brand:
 *                  type: string
 *                  example: "NiKe"
 *                picUrl:
 *                  type: string
 *                  format: uri
 *                  example: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i99RDk1ZU0CA/v2/-1x-1.jpg"
 *                condition:
 *                  type: string
 *                  example: "New"
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                  example: "2024-02-11T22:09:00.000Z"
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                  example: "2024-02-11T22:09:00.000Z"
 *                categoryNames:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: "Clothing"
 *                
 *      responses:
 *        "201":
 *          description: Sell post created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "SellPost created successfully"
 *                  sellPost:
 *                    $ref: '#/definitions/SellPostWithUser'
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Item name, price, and quantity cannot be empty!"
 *        "404":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User not found"
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
 * definitions:
 *   SellPost:
 *     type: object
 *     properties:
 *       seller_id:
 *         type: integer
 *         example: 2
 *       item_name:
 *         type: string
 *         example: "SneakersSneakers"
 *       description:
 *         type: string
 *         example: "Running shoes"
 *       price:
 *         type: string
 *         example: "59.99"
 *       quantity:
 *         type: integer
 *         example: 50
 *       size:
 *         type: string
 *         example: "10"
 *       gender:
 *         type: string
 *         example: "Male"
 *       color:
 *         type: string
 *         example: "White"
 *       brand:
 *         type: string
 *         example: "Adidas"
 *       picUrl:
 *         type: string
 *         format: uri
 *         example: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i99RDk1ZU0CA/v2/-1x-1.jpg"
 *       condition:
 *         type: string
 *         example: "New"
 *       createdAt:
 *         type: string
 *         format: date-time
 *         example: "2024-02-11T22:09:00.000Z"
 *       updatedAt:
 *         type: string
 *         format: date-time
 *         example: "2024-02-11T22:09:00.000Z"
 *   Category:
 *     type: object
 *     properties:
 *       category_name:
 *         type: string
 *         example: "Shoes"
 */

    router.post("/", sellpost.create);
  
    // Retrieve all sellposts

  /**
 *  @swagger
 *  /api/sellposts:
 *    get:
 *      summary: Get a list of sellposts
 *      description: Retrieve a list of all sellposts.
 *      tags:
 *        - SellPost
 *      responses:
 *        "200":
 *          description: A list of all sellposts with Seller and Catergory.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/definitions/SellPostWithUser'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Some error occurred while retrieving SellPosts."
 */
    router.get("/", sellpost.findAll);
  
    // Retrieve a single sellpost with id
/**
 *  @swagger
 *  /api/sellposts/{sellpost_id}:
 *    get:
 *      summary: Get sell post by ID
 *      description: Retrieve a single sell post by its ID.
 *      tags:
 *        - SellPost
 *      parameters:
 *        - in: path
 *          name: sellpost_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Numeric ID of the sell post to retrieve.
 *      responses:
 *        "200":
 *          description: JSON response containing the sellpost details with seller and comments
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  sellpost_id:
 *                    type: integer
 *                    example: 1
 *                  seller_id:
 *                    type: integer
 *                    example: 1
 *                  item_name:
 *                    type: string
 *                    example: "T-Shirt"
 *                  description:
 *                    type: string
 *                    example: "Blue cotton T-Shirt"
 *                  price:
 *                    type: string
 *                    example: "15.99"
 *                  quantity:
 *                    type: integer
 *                    example: 100
 *                  size:
 *                    type: string
 *                    example: "M"
 *                  gender:
 *                    type: string
 *                    example: "Male"
 *                  color:
 *                    type: string
 *                    example: "Blue"
 *                  brand:
 *                    type: string
 *                    example: "Represent"
 *                  picUrl:
 *                    type: string
 *                    format: uri
 *                    example: "https://sfycdn.speedsize.com/fbaf6506-81e1-43a2-bcc1-80e18c7b0146/https://representclo.com/cdn/shop/products/SCALED__0037_blueOCfront.jpg?v=1685533911&width=1280"
 *                  condition:
 *                    type: string
 *                    example: "New"
 *                  createdAt:
 *                    type: string
 *                    format: date-time
 *                    example: "2024-02-28T01:22:26.000Z"
 *                  updatedAt:
 *                    type: string
 *                    format: date-time
 *                    example: "2024-02-28T01:22:26.000Z"
 *                  seller:
 *                    $ref: '#/definitions/User'
 *                  categories:
 *                    type: array
 *                    items:
 *                      $ref: '#/definitions/Category'
 *                  comments:
 *                    type: array
 *                    items:
 *                      $ref: '#/definitions/CommentWithUser'
 *        "404":
 *          description: Sell post not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Sell post not found."
 * definitions:
 *   CommentWithUser:
 *     type: object
 *     properties:
 *       comment_id:
 *         type: integer
 *         example: 2
 *       user_id:
 *         type: integer
 *         example: 2
 *       description:
 *         type: string
 *         example: "Love it"
 *       sellpost_id:
 *         type: integer
 *         example: 1
 *       createdAt:
 *         type: string
 *         format: date-time
 *         example: "2024-02-28T01:22:26.000Z"
 *       updatedAt:
 *         type: string
 *         format: date-time
 *         example: "2024-02-28T01:22:26.000Z"
 *       user:
 *         $ref: '#/definitions/User'
 */
    router.get("/:sellpostId", sellpost.findOne);
  
    // Update a sellpost with id
    router.put("/:sellpostId", sellpost.update);
  
    // Delete a sellpost with id
/**
 *  @swagger
 *  /api/sellposts/{sellpost_id}:
 *    delete:
 *      summary: Delete a sell post by ID
 *      description: Delete a sell post with the specified ID.
 *      tags:
 *        - SellPost
 *      parameters:
 *        - in: path
 *          name: sellpost_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Numeric ID of the sell post to delete.
 *      responses:
 *        "200":
 *          description: Sell post was deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "SellPost was deleted successfully!"
 *        "404":
 *          description: Sell post not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Cannot delete SellPost with id={sellpost_id}. SellPost not found!"
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Could not delete SellPost with id={sellpost_id}"
 */

    router.delete("/:sellpostId", sellpost.delete);
  
    // Delete all sellposts
   // router.delete("/", sellpost.deleteAll);
  
    app.use('/api/sellposts', router);
  };
  