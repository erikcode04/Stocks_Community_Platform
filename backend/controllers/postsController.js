require('dotenv').config({ path: './.env.local' });
const postsService = require("../services/postsService");
const jwt = require('jsonwebtoken');

exports.post = async (req, res) => {
    try {
        const {subject, userId ,title, textAreaContent } = req.body.body;
        console.log("req.body", req.body);

        console.log("textAreaContent", textAreaContent);
        await postsService.post(subject, userId ,title, textAreaContent);
        res.status(201).json({ title, textAreaContent });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await postsService.getPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


exports.likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        await postsService.likePost(postId, userId);
        res.status(200).json({ message: "Post liked" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        await postsService.unlikePost(postId, userId);
        res.status(200).json({ message: "Post unliked" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getPostsByUserId = async (req, res) => {
    try {
        console.log("req.query", req.query);
        const { userId } = req.query;
        const posts = await postsService.getPostsByUserId(userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deletePost = async (req, res) => {
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId === req.body.post.userId) {
        console.log("decoded", decoded);
        const { postId } = req.body.post.userId;
        await postsService.deletePost(req.body.post);
        res.status(200).json({ message: "Post deleted" });
        }
        else {
            res.status(400).json({ message: "You are not authorized to delete this post" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}





