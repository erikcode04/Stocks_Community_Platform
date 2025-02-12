const { connectDB, client } = require('../config/db'); 
const axios = require('axios');
require('dotenv').config({ path: './.env.local' });

async function checkIfSymbolIsValid (symbol) {
    try {

        const stockSymbol = symbol;
        const stockPricesApiKey = process.env.STOCKPRICES_API_KEY;
        const response = await axios.get(`https://api.twelvedata.com/price?symbol=${stockSymbol}&apikey=${stockPricesApiKey}`);
            console.log(response);
            const price = response.data.price;
        if (response.data["Error Message"]) {
            return res.status(400).json({  message: "Invalid stock symbol" });
        }
       return price ;
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}








async function uploadStockPredictionq(stockSymbol, year1, year2, year3, year4, year5) {
    try {
        const response = await axios.post("http://localhost:5000/graphs/uploadStockPrediction", {
            stockSymbol,
            year1,
            year2,
            year3,
            year4,
            year5
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    checkIfSymbolIsValid,
    uploadStockPredictionq
}