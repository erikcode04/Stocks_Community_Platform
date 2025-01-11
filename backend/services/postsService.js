const { connectDB, client } = require('../config/db'); // Adjust the path if necessary
const { ObjectId } = require('mongodb');
const axios = require('axios');
require('dotenv').config({ path: './.env.local' });


async function post( subject, userId ,title, textAreaContent) {
    console.log('post function inside postsService');
      await connectDB(); 
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        const likes =[];
        const result = await db.collection('posts').insertOne({subject, userId, title, textAreaContent, created: new Date(), likes });
        console.log('Post inserted:', result);
        return result;
    } catch (error) {
        console.error('Error inserting post:', error);
        throw error;
    }

}

async function getPosts() {
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
       const prepPosts = await db.collection('posts').find().toArray();
       const userIds = prepPosts.map(post => post.userId);
       const objectIdArray = userIds.map(id => new ObjectId(id));
       const users = await db.collection('users').find({ _id: { $in: objectIdArray } }).toArray(); 
       const sanitizedUsers = users.map(user => {
        const { hashedPassword, ...sanitizedUser } = user;
        return sanitizedUser;
    });
        let posts = [];
     for (let post of prepPosts) {
            const user = sanitizedUsers.find(user => user._id.toString() === post.userId);
            post.user = user;
            posts.push(post);
        }
        console.log('Posts:', posts);
        return posts;
    } catch (error) {
        console.error('Error finding posts:', error);
        throw error;
    }
}


async function likePost(postId, userId) {   
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        console.log('postId', postId);
        console.log('userId', userId);
        const result = await db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $push: { likes: userId } });
        console.log('Post liked:', result);
        return result;
    } catch (error) {
        console.error('Error liking post:', error);
        throw error;
    }
}

async function unlikePost(postId, userId) {
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }   
    try {
        const result = await db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $pull: { likes: userId } });
        console.log('Post unliked:', result);
        return result;
    } catch (error) {
        console.error('Error unliking post:', error);
        throw error;
    }
}

async function getPostsByUserId(userId) {
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        const posts = await db.collection('posts').find({ userId }).toArray();
        console.log('Posts:', posts);
        return posts;
    } catch (error) {
        console.error('Error finding posts:', error);
        throw error;
    }
}


async function deletePost(post) {
    console.log('deletePost function inside postsService');
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        console.log('post', post);
        const result = await db.collection('posts').deleteOne({ _id: new ObjectId(post._id) });
        console.log('Post deleted:', result);
        return result;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}

async function uploadStockList(stockList, userId) {
    const stockPricesApiKey = process.env.STOCKPRICES_API_KEY;
    console.log('uploadStockList function inside postsService with my api', stockPricesApiKey);
    let stockListArray = [];
    Object.entries(stockList).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        if (value.length !== 0) {
            const stock = { symbol: value};
            stockListArray.push(stock);
        }
      });
   let stockArray = [];
      for (let index = 0; index < stockListArray.length; index++) {
        const element = stockListArray[index];
        console.log('element', element.symbol);
        try {
            const response = await axios.get(`https://api.twelvedata.com/price?symbol=${element.symbol}&apikey=${stockPricesApiKey}`);
            console.log('response', response.data);
            console.log('response price', response.data.price);
            if (response.data.price) {
                console.log("checking if I get here");
                const stock = { symbol: element.symbol, price: response.data.price };
                stockArray.push(stock);
            }
         } catch (error) {
            console.error('Error getting stock price:', error);
            throw error;
        }
      }
    console.log('stockArray', stockArray);
    console.log('stockListArray', stockListArray);
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        const date = new Date();
        const todayDate = date.toLocaleString();
     const result = await db.collection('stockLists').insertOne({ userId, todayDate, stockArray });
        console.log('Stock list uploaded:', result);
        return result;
    } catch (error) {
        console.error('Error uploading stock list:', error);
        throw error;
    }
}


module.exports = {
    post,
    getPosts,
    likePost,
    unlikePost,
    getPostsByUserId,
    deletePost,
    uploadStockList
};