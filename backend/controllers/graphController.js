const express = require('express');
const graphServices = require('../services/graphService');
require('dotenv').config({ path: './.env.local' });
const jwt = require('jsonwebtoken');


exports.checkIfSymbolIsValid = async (req, res) => {
  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
    try {
        const symbol = req.params.stockSymbol;
        console.log("stock symbol", symbol);
       const response = await graphServices.checkIfSymbolIsValid(symbol);
        const price = response;
        res.status(200).json({ message: "Valid stock symbol", price });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.uploadStockPrediction = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { stockSymbol, year1, year2, year3, year4, year5 } = req.body;
        console.log("stock prediction controller", stockSymbol, year1, year2, year3, year4, year5);
        res.status(200).json({ message: "Stock prediction uploaded successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    }
