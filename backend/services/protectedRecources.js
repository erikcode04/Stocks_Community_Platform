const { connectDB, client } = require('../config/db');


async function getProtectedDataForUser(userId) {
    // Replace with actual data fetching logic
console.log("getProtectedDataForUser function inside protectedRecources with id", userId);
 await connectDB(); // Ensure the database is connected
const db = client.db();
if (!db) {
    console.log("Database not connected");
    throw new Error('Failed to connect to the database');
}
const users = db.collection('users');
const user = await users.findOne({ _id: userId });
if (!user) {
    console.log("User not found");
    throw new Error('User not found');
}

    return { userId, data: "This is protected data" };
  }


