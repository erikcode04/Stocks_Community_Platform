const authService = require('../services/authService');

// Login function
exports.login = async (req, res) => {
  try {
    console.log("login controller" , req.body);
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

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



