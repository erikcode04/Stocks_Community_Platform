const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

// Define routes and use the controller
router.post('/post', postsController.post);
router.get('/getPosts', postsController.getPosts);
router.post('/likePost', postsController.likePost);
router.post('/unlikePost', postsController.unlikePost);
router.get('/getPostsByUserId', postsController.getPostsByUserId);
router.delete('/deletePost', postsController.deletePost);
router.post("/uploadStockList", postsController.uploadStockList);
router.get("/getStocklists/:startIndex", postsController.getStocklists);
module.exports = router;
