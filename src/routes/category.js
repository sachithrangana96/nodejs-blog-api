const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');

// get category
router.get('/',categoryController.getAllCategory);

// insert category
router.post('/',categoryController.create);

// get single category
router.get('/:id',categoryController.getCategoryById);

// get Status wise
router.get('/:status',categoryController.getStatusCategory);

// update category
router.put('/:id',categoryController.updateCategory);

//delete category
router.delete('/:id',categoryController.deleteCategory);





module.exports = router;