const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');


/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The Category Name
 *         status:
 *           type: string
 *           description: Active|Cancel|Ongoing
 *       example:
 *         id: 1
 *         name: Networking
 *         
 */

/**
 *  @swagger
 * tags:
 *    name: Category
 *    description: The Category Managing API
 */




/**
 * @swagger
 * /category:
 *   get:
 *     summary: Returns the list of all the category
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

// get category
router.get('/',categoryController.getAllCategory);



/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new book
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some server error
 */



// insert category
router.post('/',categoryController.create);


/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The Category was not found
 */



// get single category
router.get('/:id',categoryController.getCategoryById);

// get Status wise
router.get('/:status',categoryController.getStatusCategory);



/**
 * @swagger
 * /category/{id}:
 *  put:
 *    summary: Update the category by the id
 *    tags: [Category]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: The category was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      404:
 *        description: The category was not found
 *      500:
 *        description: Some error happened
 */


// update category
router.put('/:id',categoryController.updateCategory);



/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Remove the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 * 
 *     responses:
 *       200:
 *         description: The category was deleted
 *       404:
 *         description: The category was not found
 */



//delete category
router.delete('/:id',categoryController.deleteCategory);





module.exports = router;