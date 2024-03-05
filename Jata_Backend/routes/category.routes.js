module.exports = (app) => {
    const category = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Category
  /**
 *  @swagger
 *  /api/category:
 *    post:
 *      summary: Create a new category
 *      description: Create a new category with the provided category name.
 *      tags:
 *        - Category
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                category_name:
 *                  type: string
 *                  example: "Clothing"
 *      responses:
 *        "200":
 *          description: Category created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Category'
 *        "400":
 *          description: Invalid request body
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Category name cannot be empty!"
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Some error occurred while creating the category."
 */
    router.post("/", category.create);
  /**
 *  @swagger
 *  /api/category:
 *    get:
 *      summary: Get all categories
 *      description: Retrieve a list of all categories.
 *      tags:
 *        - Category
 *      responses:
 *        "200":
 *          description: A list of categories
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/definitions/Category'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Some error occurred while retrieving categories."
 */

/**
 *  @swagger
 *  definitions:
 *    Category:
 *      type: object
 *      properties:
 *        category_id:
 *          type: integer
 *          example: 1
 *        category_name:
 *          type: string
 *          example: "Clothing"
 *        createdAt:
 *          type: string
 *          format: date-time
 *          example: "2024-02-28T01:22:26.000Z"
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          example: "2024-02-28T01:22:26.000Z"
 *    CategoryWithMapTable:
 *      type: object
 *      properties:
 *        category_id:
 *          type: integer
 *          example: 1
 *        category_name:
 *          type: string
 *          example: "Clothing"
 *        createdAt:
 *          type: string
 *          format: date-time
 *          example: "2024-02-28T01:22:26.000Z"
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          example: "2024-02-28T01:22:26.000Z"
 *        sellpostcategory:
 *          $ref: '#/definitions/SellPostCategory'
 *    SellPostCategory:
 *      type: object
 *      properties:
 *        createdAt:
 *          type: string
 *          format: date-time
 *          example: "2024-02-28T01:22:26.000Z"
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          example: "2024-02-28T01:22:26.000Z"
 *        category_id:
 *          type: integer
 *          example: 1
 *        sellpost_id:
 *          type: integer
 *          example: 1
 *    CategoryWithSellPosts:
 *      type: object
 *      properties:
 *        category_id:
 *          type: integer
 *          example: 1
 *        category_name:
 *          type: string
 *          example: "Clothing"
 *        createdAt:
 *          type: string
 *          format: date-time
 *          example: "2024-02-28T01:22:26.000Z"
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          example: "2024-02-28T01:22:26.000Z"
 *        sellposts:
 *          type: array
 *          items:
 *            $ref: '#/definitions/SellPostWithUser'
 *        sellpostcategory:
 *          $ref: '#/definitions/SellPostCategory'
 *        
 */
    
    // Retrieve all Categories
    router.get("/", category.findAll);
  
    // Retrieve a single Category with id
  /**
 *  @swagger
 *  /api/category/{category_id}:
 *    get:
 *      summary: Get category by ID
 *      description: Get a single category by its ID.
 *      tags:
 *        - Category
 *      parameters:
 *        - in: path
 *          name: category_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Numeric ID of the category to retrieve.
 *      responses:
 *        "200":
 *          description: JSON response containing the category details
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/CategoryWithSellPosts'
 *        "404":
 *          description: Category not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Category not found."
 */



    router.get("/:categoryId", category.findOne);
  
    // Update a Category with id

  // router.put("/:categoryId", category.update);
  
    // Delete a Category with id
  //  router.delete("/:categoryId", category.delete);
  
    // Delete all Categories
  //  router.delete("/", category.deleteAll);
  
    // Add a SellPost to a Category
    router.post("/:categoryId/sellposts/:sellpostId", category.addSellPost);
  
    // Remove a SellPost from a Category
    router.delete("/:categoryId/sellposts/:sellpostId", category.removeSellPost);
  
    app.use('/api/category', router);
  };
  