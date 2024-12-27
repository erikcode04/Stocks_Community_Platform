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

exports.friendStatusLogic = async (req, res) => {
    console.log("req.body inside friendStatusLogic controller", req.cookies);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("token inside friendStatusLogic controller", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded inside friendStatusLogic controller", decoded);
        if (decoded) {
           const userId = decoded.userId;
            const otherUserId = req.body.userId;
            const userInfo = decoded;
            console.log("we did som variables", userId, otherUserId, userInfo);
            if (!userId) {
                return res.status(400).json({ message: "Friend status and user info are required" });
            }
            console.log("userId inside friendStatusLogic controller", userId);
            const {newToken, friendStatus}  = await usersService.friendStatusLogic( userId, otherUserId, userInfo);
            if (newToken && friendStatus) {
               console.log("newToken inside friendStatusLogic controller", newToken);
                res.cookie('token', newToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
                return res.json({ token: newToken, friendStatus: friendStatus });
            } else {
                return res.status(500).json({ message: "Failed to update friend status" });
            }
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}


exports.visitProfile = async (req, res) => {
    console.log("req.body inside friendStatusLogic controller", req.cookies);
    console.log("req.params inside friendStatusLogic controller", req.params);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("token inside friendStatusLogic controller", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded inside friendStatusLogic controller", decoded);
        if (decoded) {
           const userId = decoded.userId;
            const otherUserId = req.params.userId;
            const userInfo = decoded;
            console.log("we did som variables", userId, otherUserId);
            if (!userId) {
                return res.status(400).json({ message: "Friend status and user info are required" });
            }
            const { sendBack, friendStatus }  = await usersService.visitProfile( otherUserId, userInfo);
            console.log("sendBack inside friendStatusLogic controller", sendBack);
            console.log("friendStatus inside friendStatusLogic controller", friendStatus);
            if (sendBack) {
                return res.json( {sendBack, friendStatus });
            } else {
                return res.status(500).json({ message: "Failed to update friend status" });
            }
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

exports.deleteAccount = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            const userId = decoded.userId;
            if (!userId) {
                return res.status(400).json({ message: "User info is required" });
            }

            const response = await usersService.deleteAccount(userId);
            if (response) {
                return res.json({ message: "Account deleted" });
            } else {
                return res.status(500).json({ message: "Failed to delete account" });
            }
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}


