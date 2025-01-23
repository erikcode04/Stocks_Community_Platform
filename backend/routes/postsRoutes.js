const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

// Define routes and use the controller
router.post('/post', postsController.post);
router.post('/likePost', postsController.likePost);
router.post('/unlikePost', postsController.unlikePost);
router.get('/getPostsByUserId', postsController.getPostsByUserId);
router.delete('/deletePost', postsController.deletePost);
router.post("/uploadStockList", postsController.uploadStockList);
router.get('/getPosts/:startIndex', postsController.getPosts);
router.get("/getStocklists/:startIndex", postsController.getStocklists);
module.exports = router;
