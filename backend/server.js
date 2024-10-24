const express = require('express');
const { connectDB, client } = require('./config/db'); // Adjust the path if necessary

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example route using the connected client
app.get('/data', async (req, res) => {
  try {
    const collection = client.db('your_database_name').collection('your_collection_name');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});