const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model

const secretKey = process.env.JWT_SECRET; // Use environment variables for sensitive data

// Login function
async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  return token;
}

// Signup function
async function signup(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  return user;
}

module.exports = {
  login,
  signup,
};