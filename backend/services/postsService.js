const { connectDB, client } = require('../config/db'); // Adjust the path if necessary
const { ObjectId } = require('mongodb');

async function post( userId ,title, textAreaContent) {
    console.log('post function inside postsService');
      await connectDB(); // Ensure the database is connected
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        const result = await db.collection('posts').insertOne({ userId, title, textAreaContent, created: new Date() });
        console.log('Post inserted:', result);
        return result;
    } catch (error) {
        console.error('Error inserting post:', error);
        throw error;
    }

}

async function getPosts() {
    await connectDB(); // Ensure the database is connected
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        const posts = await db.collection('posts').find().toArray();
        const userIds = posts.map(post => post.userId);
       const objectIdArray = userIds.map(id => new ObjectId(id));
        console.log('Object ID array:', objectIdArray);
       const users = await db.collection('users').find({ _id: { $in: objectIdArray } }).toArray(); 
     for (let i = 0; i < users.length; i++) {
        const element = users[i];
      
        console.log('Element:', element);
     }
     for (let post of posts) {
            const user = users.find(user => user._id.toString() === post.userId);
            console.log('User:', user);
            post.user = user;
            console.log('Post:', post);
        }
        return posts;
    } catch (error) {
        console.error('Error finding posts:', error);
        throw error;
    }
}


module.exports = {
    post,
    getPosts
};