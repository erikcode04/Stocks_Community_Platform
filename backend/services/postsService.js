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

async function getPosts(startIndex) {
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        console.log('startIndex inside getPosts', startIndex);
        const latestDocuments = await db.collection("posts").find()
        .sort({ uploadDate: -1 })
        .skip(parseInt(startIndex))
        .limit(10)
        .toArray();
        if (latestDocuments.length === 0) {
            throw new Error('No posts found');
        }
        console.log('latestDocuments', latestDocuments);
       const userIds = latestDocuments.map(post => post.userId);
       const objectIdArray = userIds.map(id => new ObjectId(id));
       const users = await db.collection('users').find({ _id: { $in: objectIdArray } }).toArray(); 
       const sanitizedUsers = users.map(user => {
        const { hashedPassword, ...sanitizedUser } = user;
        return sanitizedUser;
    });
        let posts = [];
     for (let post of  latestDocuments) {
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
        const stockLists = await db.collection('stockLists').find({ userId }).toArray();
        sendBack = {posts, stockLists};
        console.log('senback:', sendBack);
        console.log('Posts:', posts);
        return sendBack;
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
    console.log('uploadStockList function inside postsService');
    const stockPricesApiKey = process.env.STOCKPRICES_API_KEY;
    let stockListArray = [];
    Object.entries(stockList).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        if (value.length !== 0) {
            const stock = { symbol: value};
            stockListArray.push(stock);
        }
      });
      console.log('stockListArraylength', stockListArray.length);
      if (stockListArray.length === 0) {
        throw new Error('No stock symbols found');
      }
      console.log('stockListArray', stockListArray);
   let stockArray = [];
   let loserSendBack = [];
      for (let index = 0; index < stockListArray.length; index++) {
        console.log('index', index);
        const element = stockListArray[index];
        console.log('element', element);
        try {
            const response = await axios.get(`https://api.twelvedata.com/price?symbol=${element.symbol}&apikey=${stockPricesApiKey}`);
            if (response.data.price) {
                console.log('Stock price:', response.data.price);
                const stock = { symbol: element.symbol, price: response.data.price };
                stockArray.push(stock);
            }
            else {
                const loser = element.symbol;
                loserSendBack.push(loser);
            }

         } catch (error) {
            console.error('Error getting stock price:', error);
            throw error;
        }
      }
      console.log('stockArray', stockArray);
     if (stockArray.length === 0) {
        throw new Error('No stock prices found');
    }
      console.log('stockArray', stockArray);
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        const date = new Date();
      const uploadDate = date.toLocaleString();
     const result = await db.collection('stockLists').insertOne({ userId, uploadDate, stockArray });
        console.log('Stock list uploaded:', result);
        return loserSendBack;
    } catch (error) {
        console.error('Error uploading stock list:', error);
        throw error;
    }
}

async function getStocklists(startIndex) {
    await connectDB();
    const db = client.db();
    if (!db) {
        throw new Error('Failed to connect to the database');
    }
    try {
        const latestDocuments = await db.collection("stockLists").find()
        .sort({ uploadDate: -1 })
        .skip(parseInt(startIndex))
        .limit(10)
        .toArray();
         if (latestDocuments.length === 0) {
            throw new Error('No stock lists found');
         }
        const userIds = latestDocuments.map(doc => doc.userId);
        const objectIdArray = userIds.map(id => new ObjectId(id));
        const users = await db.collection('users').find({ _id: { $in: objectIdArray } }).toArray();
        const sanitizedUsers = users.map(user => {
            const { hashedPassword, ...sanitizedUser } = user;
            return sanitizedUser;
        });
        for (let doc of latestDocuments) {
            const user = sanitizedUsers.find(user => user._id.toString() === doc.userId);
            doc.user = user;
        }

        console.log('Latest documents:', latestDocuments);
        return latestDocuments;
    }
    catch (error) {
        console.error('Error finding latest documents:', error);
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
    uploadStockList,
    getStocklists
};