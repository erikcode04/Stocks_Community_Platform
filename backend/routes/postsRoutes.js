const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

// Define routes and use the controller
router.post('/post', postsController.post);

module.exports = router;
