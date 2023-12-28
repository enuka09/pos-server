const express = require('express');
const customerController = require('../controller/CustomerController');
const router = express.Router();
const verifyUser = require('../middleware/AuthMiddleware')

// router.post('/create', verifyUser, customerController.create);
// router.get('/find-all', verifyUser, customerController.findAll);
// router.delete('/delete-by-id/:id', verifyUser, customerController.deleteById);
// router.put('/update', verifyUser, customerController.update);
router.post('/create', customerController.create);
// router.get('/find-by-id', verifyUser, customerController.findById);
router.put('/update/:id', customerController.update);
router.delete('/delete-by-id/:id', customerController.deleteById);
router.get('/find-all', customerController.findAll);
router.get('/find-by-id/:id', customerController.findById);

module.exports = router;
