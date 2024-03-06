module.exports = app => {
    const user = require("../controllers/user.controller");
    var router = require("express").Router();
  
    // Create a new Tutorial
    // BODY:
    // {
    //   "username": "phuhuutin",
    //   "email": "john@example.com",
    //   "role_id": 1,
    //   "first_name": "Tin",
    //   "last_name": "Doe",
    //   "gender": "Male",
    //   "date_of_birth": "1990-05-15T00:00:00.000Z",
    //   "profile_pictureUrl": "https://img.freepik.com/free-photo/portrait-friendly-looking-happy-attractive-male-model-with-moustache-beard-wearing-trendy-transparent-glasses-smiling-broadly-while-listening-interesting-story-waiting-mom-give-meal_176420-22400.jpg",
    //   "address": {
    //           "street_address": "123 Main St",
    //           "city": "Tacoma",
    //           "state": "NY",
    //           "zip_code": "10001",
    //           "country": "USA"
    //       }
    // }
    router.post("/", user.create);
  
    // Retrieve all user
    /**
     *@swagger
     *  /api/user:
     *  get:
     *    summary: get list of users
     *    description: get a list of detail users.
     *    tags: 
     *      - User
     *    responses:
     *      "200":
     *        description: JSON response of a list of users
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/definitions/User'
     *      "500":
     *        description: Error
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *                  example: "Some error occurred while retrieving users."
     *definitions:
     *   PUTUser:
     *    properties:
     *       user_id:
     *          type: integer
     *          example: 11
     *       username:
     *          type: string
     *          examnple: 'phuhuutin'
     *       email:
     *          type: string
     *          examnple: 'huutinphu@gmail.com'
     *       first_name:
     *          type: string
     *          example: "Tin"
     *       last_name:
     *          type: string
     *          example: "Phu"
     *       gender:
     *          type: string
     *          example: "Male"
     *       date_of_birth:
     *          type: string
     *          format: date-time
     *          example: "1990-05-15T00:00:00.000Z"
     *       profile_pictureUrl: # Profile Picture URL
     *          type: string
     *          format: uri
     *          example: "https://img.freepik.com/free-photo/portrait-friendly-looking-happy-attractive-male-model-with-moustache-beard-wearing-trendy-transparent-glasses-smiling-broadly-while-listening-interesting-story-waiting-mom-give-meal_176420-22400.jpg"
     *       createdAt:          # Created At
     *         type: string
     *         format: date-time
     *         example: "2024-02-28T01:22:26.000Z"
     *       updatedAt:          # Updated At
     *         type: string
     *         format: date-time
     *         example: "2024-02-28T01:22:26.000Z"
     *   User:
     *    properties:
     *       user_id:
     *          type: integer
     *          example: 11
     *       username:
     *          type: string
     *          examnple: 'phuhuutin'
     *       email:
     *          type: string
     *          examnple: 'huutinphu@gmail.com'
     *       first_name:
     *          type: string
     *          example: "Tin"
     *       last_name:
     *          type: string
     *          example: "Phu"
     *       gender:
     *          type: string
     *          example: "Male"
     *       date_of_birth:
     *          type: string
     *          format: date-time
     *          example: "1990-05-15T00:00:00.000Z"
     *       profile_pictureUrl: # Profile Picture URL
     *          type: string
     *          format: uri
     *          example: "https://img.freepik.com/free-photo/portrait-friendly-looking-happy-attractive-male-model-with-moustache-beard-wearing-trendy-transparent-glasses-smiling-broadly-while-listening-interesting-story-waiting-mom-give-meal_176420-22400.jpg"
     *       createdAt:          # Created At
     *         type: string
     *         format: date-time
     *         example: "2024-02-28T01:22:26.000Z"
     *       updatedAt:          # Updated At
     *         type: string
     *         format: date-time
     *         example: "2024-02-28T01:22:26.000Z"
     *   SingleUserWithSellPost:
     *    properties:
     *       user_id:
     *          type: integer
     *          example: 11
     *       username:
     *          type: string
     *          examnple: 'phuhuutin'
     *       email:
     *          type: string
     *          examnple: 'huutinphu@gmail.com'
     *       first_name:
     *          type: string
     *          example: "Tin"
     *       last_name:
     *          type: string
     *          example: "Phu"
     *       gender:
     *          type: string
     *          example: "Male"
     *       date_of_birth:
     *          type: string
     *          format: date-time
     *          example: "1990-05-15T00:00:00.000Z"
     *       profile_pictureUrl: # Profile Picture URL
     *          type: string
     *          format: uri
     *          example: "https://img.freepik.com/free-photo/portrait-friendly-looking-happy-attractive-male-model-with-moustache-beard-wearing-trendy-transparent-glasses-smiling-broadly-while-listening-interesting-story-waiting-mom-give-meal_176420-22400.jpg"
     *       createdAt:          # Created At
     *         type: string
     *         format: date-time
     *         example: "2024-02-28T01:22:26.000Z"
     *       updatedAt:          # Updated At
     *         type: string
     *         format: date-time
     *         example: "2024-02-28T01:22:26.000Z"
     *       sellposts:
     *         type: array
     *         items:
     *          $ref: '#/definitions/SellPost'
     *       addresses: 
     *         type: array
     *         items:
     *          $ref: '#/definitions/Address'
     *   Address:
     *      type: object
     *      properties:
     *        address_id:
     *          type: integer
     *          example: 1
     *        user_id:
     *          type: integer
     *          example: 1
     *        street_address:
     *          type: string
     *          example: "123 Main St"
     *        city:
     *          type: string
     *          example: "New York"
     *        state:
     *          type: string
     *          example: "NY"
     *        zip_code:
     *          type: string
     *          example: "10001"
     *        country:
     *          type: string
     *          example: "USA"
     *        createdAt:
     *          type: string
     *          format: date-time
     *          example: "2024-02-28T01:22:26.000Z"
     *        updatedAt:
     *          type: string
     *          format: date-time
     *          example: "2024-02-28T01:22:26.000Z"
     *         
     *   SellPost:
      *      type: object
      *      properties:
      *        sellpost_id:
      *          type: integer
      *          example: 1
      *        seller_id:
      *          type: integer
      *          example: 1
      *        item_name:
      *          type: string
      *          example: "T-Shirt"
      *        description:
      *          type: string
      *          example: "Blue cotton T-Shirt"
      *        price:
      *          type: string
      *          example: "15.99"
      *        quantity:
      *          type: integer
      *          example: 100
      *        size:
      *          type: string
      *          example: "M"
      *        gender:
      *          type: string
      *          example: "Male"
      *        color:
      *          type: string
      *          example: "Blue"
      *        brand:
      *          type: string
      *          example: "Represent"
      *        picUrl:
      *          type: string
      *          format: uri
      *          example: "https://sfycdn.speedsize.com/fbaf6506-81e1-43a2-bcc1-80e18c7b0146/https://representclo.com/cdn/shop/products/SCALED__0037_blueOCfront.jpg?v=1685533911&width=1280"
      *        condition:
      *          type: string
      *          example: "New"
      *        createdAt:
      *          type: string
      *          format: date-time
      *          example: "2024-02-28T01:22:26.000Z"
      *        updatedAt:
      *          type: string
      *          format: date-time
      *          example: "2024-02-28T01:22:26.000Z"
      *   SellPostWithUser:
      *      type: object
      *      properties:
      *        sellpost_id:
      *          type: integer
      *          example: 1
      *        seller_id:
      *          type: integer
      *          example: 1
      *        item_name:
      *          type: string
      *          example: "T-Shirt"
      *        description:
      *          type: string
      *          example: "Blue cotton T-Shirt"
      *        price:
      *          type: string
      *          example: "15.99"
      *        quantity:
      *          type: integer
      *          example: 100
      *        size:
      *          type: string
      *          example: "M"
      *        gender:
      *          type: string
      *          example: "Male"
      *        color:
      *          type: string
      *          example: "Blue"
      *        brand:
      *          type: string
      *          example: "Represent"
      *        picUrl:
      *          type: string
      *          format: uri
      *          example: "https://sfycdn.speedsize.com/fbaf6506-81e1-43a2-bcc1-80e18c7b0146/https://representclo.com/cdn/shop/products/SCALED__0037_blueOCfront.jpg?v=1685533911&width=1280"
      *        condition:
      *          type: string
      *          example: "New"
      *        createdAt:
      *          type: string
      *          format: date-time
      *          example: "2024-02-28T01:22:26.000Z"
      *        updatedAt:
      *          type: string
      *          format: date-time
      *          example: "2024-02-28T01:22:26.000Z" 
      *        seller: 
      *          $ref: '#/definitions/User'
      *        categories:
      *          $ref: '#/definitions/CategoryWithMapTable'   
      * 
      */
    
    router.get("/", user.findAll);
  

  
    // Retrieve a single user with id
    /**
 *  @swagger
 *  /api/user/{user_id}:
 *    get:
 *      summary: Get user by ID
 *      description: Get a single user by their ID.
 *      tags:
 *        - User
 *      parameters:
 *        - in: path
 *          name: user_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Numeric ID of the user to retrieve.
 *      responses:
 *        "200":
 *          description: JSON response containing the user details
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/SingleUserWithSellPost'
 *        "404":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User with id=${id} not found."
 *        "500":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Error retrieving User with id=${id}: ${err.message}."
 */
 router.get("/:userId", user.findOne);



     // Retrieve a single user with email
/**
 *  @swagger
 *  /api/user/email/{userEmail}:
 *    get:
 *      summary: Get user by email
 *      description: Get a single user by their email address.
 *      tags:
 *        - User
 *      parameters:
 *        - in: path
 *          name: userEmail
 *          required: true
 *          schema:
 *            type: string
 *          description: Email address of the user to retrieve.
 *      responses:
 *        "200":
 *          description: JSON response containing the user details
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/User'
 *        "404":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User not found."
 *        "500":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Error retrieving User with email=${email}: ${err.message}."
 */

     router.get("/email/:userEmail", user.findOneByEmail);
  
    // Update a user with id
/**
 *  @swagger
 *  /api/user/{user_id}:
 *    put:
 *      summary: Update user
 *      description: Update an existing user.
 *      tags:
 *        - User
*      parameters:
 *        - in: path
 *          name: user_id
 *          required: true
 *          description: ID of the order to update
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        description: CreateAt and UpdatedAt are optional
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 *      responses:
 *        "200":
 *          description: User updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User was updated successfully."
 *        "404":
 *          description: User updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Cannot update User with id=${id}. Maybe User was not found or req.body is empty!"
 *        "500":
 *          description: User updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Error updating User with id=${id}."
 */
    router.put("/:userId", user.update);
  
    // Delete a user with id
/**
 *  @swagger
 *  /api/user/{userId}:
 *    delete:
 *      summary: Delete user by ID
 *      description: Delete an existing user by their ID.
 *      tags:
 *        - User
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          schema:
 *            type: integer
 *          description: Numeric ID of the user to delete.
 *      responses:
 *        "200":
 *          description: User deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User was deleted successfully!"
 *        "404":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Cannot delete User with id=1. Maybe User was not found!"
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Could not delete User with id=1"
 */
    router.delete("/:userId", user.delete);
  
    // Delete all user
    //router.delete("/", user.deleteAll);
    
    router.post("/noAddress", user.createWithNoAddress);
    app.use('/api/user', router);
  };