require('dotenv').config({ path: './.env.local' }); // Load environment variables from .env.local in the same directory
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    console.log("login controller return from login", token);
    res.cookie('token', token,  {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 60 * 60 * 1000 // 1 hour
    });    res.status(200).json( { message: "Login successful" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


exports.logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Signup function
exports.signup = async (req, res) => {
  try {
    console.log("signup controller" , req.body);
    const { email, userName, password } = req.body;
    const user = await authService.signup(email, userName, password);
    console.log("signup controller return from signup", user);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.verifyToken = async (req, res) => {

  const token = req.cookies.token; 

  if (token) {
      try {
        console.log("fwewfwef");
          const decoded = jwt.verify(token, process.env.JWT_SECRET); 
          console.log("decoded", decoded);
          const sendBack = { userId: decoded.userId,
           email: decoded.email,
           userName: decoded.userName,
           };
          res.status(200).json({ success: true, userInfo: sendBack });
      } catch (err) {
          res.status(401).json({ success: false, message: 'Invalid token' });
      }
  } else {
      res.status(401).json({ success: false, message: 'No token provided' });
  }
};





exports.protectedRecources = async (req, res) => {
  try {
    console.log("protectedRecources controller");

    // Authentication check
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await authService.verifyToken(token);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Fetch protected data (example: fetch user-specific data)
    const protectedData = await getProtectedDataForUser(user.id);

    res.status(200).json({ message: "Protected resource", data: protectedData });
  } catch (error) {
    console.error("Error in protectedRecources controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




