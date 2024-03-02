module.exports = app => {
    const comment = require("../controllers/comment.controller");
  
    var router = require("express").Router();

/**
 *  @swagger
 *  /api/comment:
 *    post:
 *      summary: Create a new comment
 *      description: Create a new comment with the specified user ID and sellpost ID.
 *      tags:
 *        - Comment
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: integer
 *                  example: 11
 *                description:
 *                  type: string
 *                  example: "Love it"
 *                sellpost_id:
 *                  type: integer
 *                  example: 1
 *              required:
 *                - user_id
 *                - description
 *                - sellpost_id
 *      responses:
 *        "200":
 *          description: Comment created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/CommentWithUser'
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User ID, description, and post ID can not be empty!"
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Some error occurred while creating the Comment."
 */

/**
 *  @swagger
 *  definitions:
 *    CommentWithUser:
 *      type: object
 *      properties:
 *        comment_id:
 *          type: integer
 *        user_id:
 *          type: integer
 *        description:
 *          type: string
 *        sellpost_id:
 *          type: integer
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        user:
 *          $ref: '#/definitions/User'
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
 */
   
    router.post("/", comment.create);
  
    router.get("/", comment.findAll);
  
    // Retrieve a single comment with id
    router.get("/:commentId", comment.findOne);
  
    // Update a comment with id
  /**
 *  @swagger
 *  /api/comment/{comment_id}:
 *    put:
 *      summary: Update a comment by ID
 *      description: Update a comment with the specified ID.
 *      tags:
 *        - Comment
 *      parameters:
 *        - in: path
 *          name: comment_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Numeric ID of the comment to update.
 *        - in: body
 *          name: comment
 *          description: The comment object to be updated.
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              description:
 *                type: string

 *      responses:
 *        "200":
 *          description: Comment was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Comment was updated successfully."
 *        "404":
 *          description: Comment not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Cannot update Comment with id={comment_id}. Maybe Comment was not found or req.body is empty!"
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Error updating Comment with id={comment_id}"
 */
    router.put("/:commentId", comment.update);
  
    // Delete a comment with id
  
  /**
 *  @swagger
 *  /api/comment/{comment_id}:
 *    delete:
 *      summary: Delete a comment by ID
 *      description: Delete a comment with the specified ID.
 *      tags:
 *        - Comment
 *      parameters:
 *        - in: path
 *          name: comment_id
 *          required: true
 *          schema:
 *            type: integer
 *          description: Numeric ID of the comment to delete.
 *      responses:
 *        "200":
 *          description: Comment was deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Comment was deleted successfully!"
 *        "404":
 *          description: Comment not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Cannot delete Comment with id={comment_id}. Maybe Comment was not found!"
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Could not delete Comment with id={comment_id}"
 */

    router.delete("/:commentId", comment.delete);
  
    // Delete all comment
  //  router.delete("/", comment.deleteAll);
  
    app.use('/api/comment', router);
  };