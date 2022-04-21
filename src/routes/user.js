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
