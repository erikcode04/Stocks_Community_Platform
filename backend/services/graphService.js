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








async function uploadStockPredictionq(userId, stockSymbol, years) {
    try {
        await connectDB();
        const db = client.db();
        const collection = db.collection("stockPredictions");
        const todaysDate = new Date();
        const stockPrediction = { userId, stockSymbol, years, todaysDate };
        const response = await collection.insertOne(stockPrediction);
        console.log(response);
        const status = 1
        return status;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    checkIfSymbolIsValid,
    uploadStockPredictionq
}