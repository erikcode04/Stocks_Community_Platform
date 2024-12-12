require("dotenv").config({ path: "./.env.local" });


exports.post = async (req, res) => {
    try {
        console.log("post controller", req.body);
        const { title, textAreaContent } = req.body;
        res.status(201).json({ title, textAreaContent });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}