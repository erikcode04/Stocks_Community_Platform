const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Define routes and use the controller
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/verifyToken', authController.verifyToken);

module.exports = router;