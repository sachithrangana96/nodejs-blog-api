const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

// get post
router.get('/',postController.getAllPost);

// get single User
router.get('/:id',postController.getSinglePost);

// get Status wise
router.get('/:status',postController.getStatusPost);


// insert post
router.post('/',postController.create);

// update post
router.put('/:id',postController.update);

//delete post
router.delete('/:id',postController.deletePost);





module.exports = router;