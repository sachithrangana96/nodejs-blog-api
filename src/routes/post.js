const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category_id
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The Category Name
 *         description:
 *           type: string
 *           description: The Post Description
 *         category_id:
 *           type: string
 *           description: category table id
 *         user_id:
 *           type: string
 *           description: user table id
 *         status:
 *           type: string
 *           description: Active|Cancel|Ongoing
 *       example:
 *           id: 1
 *           title: Networking title
 *           description: this is a description here
 *           category_id: 2
 *           user_id: 2     
 *         
 */

/**
 *  @swagger
 * tags:
 *    name: Post
 *    description: The Post Managing API
 */



/**
 * @swagger
 * /post:
 *   get:
 *     summary: Returns the list of all the post
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: The list of the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/post'
 */





// get post
router.get('/',postController.getAllPost);




/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get the post by id
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The Post was not found
 */



// get single User
router.get('/:id',postController.getSinglePost);

// get Status wise
router.get('/:status',postController.getStatusPost);


/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */


// insert post
router.post('/',postController.create);



/**
 * @swagger
 * /post/{id}:
 *  put:
 *    summary: Update the post by the id
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Some error happened
 */


// update post
router.put('/:id',postController.update);





/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 * 
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */




//delete post
router.delete('/:id',postController.deletePost);





module.exports = router;