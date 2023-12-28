const express = require('express');
const orderController = require('../controller/OrderController');
const router = express.Router();
const verifyUser = require('../middleware/AuthMiddleware')

router.post('/create', verifyUser, orderController.create);
router.get('/find-by-id', verifyUser, orderController.findById);
router.put('/update', verifyUser, orderController.update);
router.delete('/delete-by-id', verifyUser, orderController.deleteById);
router.get('/find-all', verifyUser, orderController.findAll);

module.exports = router;
