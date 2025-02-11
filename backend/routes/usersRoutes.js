const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();


router.post('/setProfilePicture', usersController.setProfilePicture);
router.get("/getUserName", usersController.getUserName);
router.post('/friendStatusLogic', usersController.friendStatusLogic);
router.post('/search/:search', usersController.search);
router.get('/visitProfile/:userId', usersController.visitProfile);
router.delete('/deleteAccount', usersController.deleteAccount);
router.post("/recomendedSearches", usersController.recomendedSearches);
router.get('/getFriendStatus', usersController.getFriendStatus);
router.get("/searchSuggestions/:searchValue", usersController.searchSuggestions);



module.exports = router;