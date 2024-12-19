require("dotenv").config({ path: "./.env.local" });
const usersService = require("../services/usersService");
const jwt = require('jsonwebtoken');

exports.setProfilePicture = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("token inside setProfilePicture controller", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            console.log("req.body inside setProfilePicture controller", req.body);
            const { profilePicture, userInfo } = req.body;

            if (!profilePicture || !userInfo) {
                return res.status(400).json({ message: "Profile picture and user info are required" });
            }

            console.log("profilePicture inside setProfilePicture controller", profilePicture);
            console.log("userInfo inside setProfilePicture controller", userInfo);

            const newToken = await usersService.setProfilePicture(profilePicture, userInfo);
            if (newToken) {
                // Set the new token in an HTTP-only cookie
                res.cookie('token', newToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
                return res.json({ token: newToken });
            } else {
                return res.status(500).json({ message: "Failed to update profile picture" });
            }
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};