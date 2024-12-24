require('dotenv').config({ path: './.env.local' }); 
const { connectDB, client } = require('../config/db');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

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
            { email: userInfo.email, profilePicture: profilePicture, userId: userInfo.userId, userName: userInfo.userName, friends: userInfo.friends, friendRequests: userInfo.friendRequests, sentFriendRequests: userInfo.sentFriendRequests },
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

async function friendStatusLogic(userId , otherUserId, userInfo) {
    console.log(0);
    await connectDB(); 
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        const otherUser = await db.collection('users').findOne({ _id: new ObjectId(otherUserId) });
        if (user.friends.find(friend => friend.userId === otherUserId)) {
            console.log('Already friends');
             const bulkOps = [
                {
                    updateOne: {
                        filter: { _id: new ObjectId(userId) },
                        update: { $pull: { friends: { userId: otherUserId } } }
                    }
                },
                {
                    updateOne: {
                        filter: { _id: new ObjectId(otherUserId) },
                        update: { $pull: { friends: { userId: userId } } }
                    }
                },
            ];
            const result = await db.collection('users').bulkWrite(bulkOps);
            if (result.modifiedCount === 0) {
                throw new Error('Failed to update friend status');
            }
            const friends = user.friends.filter(friend => friend.userId !== otherUserId);
            const newToken = jwt.sign(
                { email: user.email, profilePicture: user.profilePicture, userId , userName: user.userName, friends: friends, friendRequests: user.friendRequests, sentFriendRequests: user.sentFriendRequests },
                secretKey,
                { expiresIn: '1h' }
            );
            const friendStatus = "Add Friend";
            return {newToken, friendStatus};
        }
        if (user.sentFriendRequests.find(request => request.userId === otherUserId)) {
           console.log("user info where I hope it exists", userInfo);
            console.log('Friend request already sent');
           const bulkOps = [
                 {
                    updateOne: { 
                        filter: { _id: new ObjectId(userId) },
                        update: { $pull: { sentFriendRequests: { userId: otherUserId } } }
                    }
                },
                {
                    updateOne: {
                        filter: { _id: new ObjectId(otherUserId) },
                        update: { $pull: { friendRequests: { userId: userId } } }
                    }
                },
            ];
            const result = await db.collection('users').bulkWrite(bulkOps);
           if (result.modifiedCount === 0) {
                throw new Error('Failed to update friend status');
            }
            const friendRequests = user.friendRequests.filter(request => request.userId !== otherUserId);
            const newToken = jwt.sign(
                { email: user.email, profilePicture: user.profilePicture, userId , userName: user.userName, friends: user.friends, friendRequests: friendRequests, sentFriendRequests: user.sentFriendRequests },
                secretKey,
                { expiresIn: '1h' }
            );
            const friendStatus = "Add Friend";
            return {newToken, friendStatus};
        }
        if (user.friendRequests.find(request => request.userId === otherUserId)) {
            console.log('Friend request already received');
            const bulkOps = [
                {
                    updateOne: {
                        filter: { _id: new ObjectId(userId) },
                        update: { $pull: { friendRequests: { userId: otherUserId } } }
                    }
                },
                {
                    updateOne: {
                        filter: { _id: new ObjectId(userId) },
                        update: { $push: { friends: { userId: otherUserId } } }
                    }
                },
                {
                    updateOne: {
                        filter: { _id: new ObjectId(otherUserId) },
                        update: { $pull: { sentFriendRequests: { userId: userId } } }
                    }
                },
                {
                    updateOne: {
                        filter: { _id: new ObjectId(otherUserId) },
                        update: { $push: { friends: { userId: userId } } }
                    }
                }
            ];
            const result = await db.collection('users').bulkWrite(bulkOps);
            if (result.modifiedCount === 0) {
                throw new Error('Failed to update friend status');
            }
            const friendRequests = user.friendRequests.filter(request => request.userId !== otherUserId);
            const friends = user.friends.concat(otherUserId);
            const newToken = jwt.sign(
                { email: user.email, profilePicture: user.profilePicture, userId , userName: user.userName, friends: friends, friendRequests: friendRequests, sentFriendRequests: user.sentFriendRequests },
                secretKey,
                { expiresIn: '1h' }
            );
            const friendStatus = "Friends";
            return {newToken, friendStatus};
        }
        console.log('Not friends, no request sent or received and lets check userInfo', userInfo);
        console.log('Sending friend request...');
        const bulkOps = [
            {
                updateOne: {
                    filter: { _id: new ObjectId(userId) },
                    update: { $push: { sentFriendRequests: { userId: otherUserId, userName: otherUser.userName } } }
                }
            },
            {
                updateOne: {
                    filter: { _id: new ObjectId(otherUserId) },
                    update: { $push: { friendRequests: { userId: userId, userName: user.userName } } }
                }
            }
      ];
        const result = await db.collection('users').bulkWrite(bulkOps);
        if (result.modifiedCount === 0) {
            throw new Error('Failed to update friend status');
        }
        const sentFriendRequests = user.sentFriendRequests.concat(otherUserId);
        const newToken = jwt.sign(
            { email: user.email, profilePicture: user.profilePicture, userId , userName: user.userName, friends: user.friends, friendRequests: user.friendRequests, sentFriendRequests: sentFriendRequests },
            secretKey,
            { expiresIn: '1h' }
        );
        console.log('New token:', newToken);
        const friendStatus = "Request Sent";
        return {newToken, friendStatus};
    } catch (error) {
        console.error('Failed to update friend status:', error);
        throw error;
    }
}

async function visitProfile(userId) {
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        const posts = await db.collection('posts').find({ userId }).toArray();
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        const sanitizedUser = { _id: user._id, userName: user.userName, email: user.email, joinedDate: user.joinedDate, profilePicture: user.profilePicture,   };
        const sendBack = { user: sanitizedUser, posts };
        return sendBack;
    } catch (error) {
        console.error('Error finding posts by user:', error);
        throw error;
    }
}


module.exports = {
    setProfilePicture,
    friendStatusLogic,
    visitProfile
};