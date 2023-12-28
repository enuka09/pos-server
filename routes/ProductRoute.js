const express = require('express');
const productController = require('../controller/ProductController');
const router = express.Router();
const verifyUser = require('../middleware/AuthMiddleware')

router.post('/create', verifyUser, productController.create);
router.get('/find-by-id', verifyUser, productController.findById);
router.put('/update', verifyUser, productController.update);
router.delete('/delete-by-id', verifyUser, productController.deleteById);
// router.get('/find-all', verifyUser, productController.findAll);


router.get('/find-all', productController.findAll);

module.exports = router;
