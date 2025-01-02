const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Define routes and use the controller
router.post('/setProfilePicture', usersController.setProfilePicture);
router.post('/friendStatusLogic', usersController.friendStatusLogic);
router.get('/visitProfile/:userId', usersController.visitProfile);
router.delete('/deleteAccount', usersController.deleteAccount);
router.post("/recomendedSearches", usersController.recomendedSearches);

module.exports = router;