const express = require('express');
const multer = require('multer');
const path = require("path");
const router = express.Router();


const userController = require('../controllers/user');
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb) => {
        return cb(null,`${file.fieldname }_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage,
    limits:{
        fileSize:10000000
    }
});



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - profile
 *         - email
 *         - dob
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         first_name:
 *           type: string
 *           description: First Name
 *         last_name:
 *           type: string
 *           description: Last Name 
 *         profile:
 *           type: file
 *           description: The Post Description
 *         email:
 *           type: string
 *           description: Email
 *         dob:
 *           type: string
 *           description: Date 
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



// get Users
router.get('/',userController.getAllUsers);




//inser Users
router.post('/',upload.single('profile'),userController.create);


// get single user
router.get('/:id',userController.getUserById);

// get Status wise
router.get('/:status',userController.getStatusUsers);

//update Users
router.put('/:id',userController.updateUser);

//delete Users
router.delete('/:id',userController.deleteUser);


module.exports = router;
