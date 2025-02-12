const express = require('express');
const graphController = require('../controllers/graphController');

const router = express.Router();

router.get("/checkIfSymbolIsValid/:stockSymbol", graphController.checkIfSymbolIsValid);
module.exports = router;