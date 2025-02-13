const express = require('express');
const graphController = require('../controllers/graphController');

const router = express.Router();

router.get("/checkIfSymbolIsValid/:stockSymbol", graphController.checkIfSymbolIsValid);
router.post("/uploadStockPrediction", graphController.uploadStockPrediction);
module.exports = router;