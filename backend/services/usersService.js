require('dotenv').config({ path: './.env.local' }); 
const { connectDB, client } = require('../config/db');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET; 

async function setProfilePicture(profilePicture, userInfo) {
    console.log('setProfilePicture function inside usersService, profilePicture:', profilePicture, 'userInfo:', userInfo);
    await connectDB(); 
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        console.log('Updating profile picture...');
        const result = await db.collection('users').updateOne({ email: userInfo.email }, { $set: { profilePicture } });
        console.log('Profile picture updated:', result);

      
        const newToken = jwt.sign(
            { email: userInfo.email, profilePicture: profilePicture, userId: userInfo.userId, userName: userInfo.userName },
            secretKey,
            { expiresIn: '1h' }
        );
        console.log('New token:', newToken);
        return newToken;
    } catch (error) {
        console.error('Failed to update profile picture:', error);
        throw error;
    }
}

module.exports = {
    setProfilePicture
};