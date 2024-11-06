const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model
require('dotenv').config({ path: './.env.local' }); // Load environment variables from .env.local in the same directory


const secretKey = process.env.JWT_SECRET; // Use environment variables for sensitive data
console.log(secretKey, "secretKey");
// Login function
console.log("signup erik");
async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
console.log("login function inside authService");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(isPasswordValid, "isPasswordValid");
  if (!isPasswordValid) {
    console.log('Invalid password inside authService');
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  return token;
}

// Signup function
async function signup(email, userName ,password) {
  console.log('Signup function inside authService');
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "hashedPassword");
    const user = new User({ email, userName , password: hashedPassword });
    console.log(user, "user");
    await user.save();
    console.log("last line of signup function");
    return user;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
}

module.exports = {
  login,
  signup,
};