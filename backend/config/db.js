require('dotenv').config({ path: './.env.local' }); // Load environment variables from .env.local in the same directory

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.CONNECTION_TO_MONGO_STRING; // Use the environment variable

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 30000, // Increase server selection timeout to 30 seconds
  socketTimeoutMS: 60000, // Increase socket timeout to 60 seconds
});
const connectDB = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db();
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, client };