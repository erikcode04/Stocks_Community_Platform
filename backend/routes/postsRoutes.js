const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

// Define routes and use the controller
router.post('/post', postsController.post);
router.get('/getPosts', postsController.getPosts);
router.post('/likePost', postsController.likePost);
module.exports = router;
