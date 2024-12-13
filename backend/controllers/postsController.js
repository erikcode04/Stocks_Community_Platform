require("dotenv").config({ path: "./.env.local" });
const postsService = require("../services/postsService");

exports.post = async (req, res) => {
    try {
        const { userId ,title, textAreaContent } = req.body.body;
        console.log("req.body", req.body);

        console.log("textAreaContent", textAreaContent);
        await postsService.post( userId ,title, textAreaContent);
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
