import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import "../styles/login.css";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
try {
   const response = await axios.post('http://localhost:5000/auth/login', { email, password });
    console.log('Login response:', response.data.token);
    const token = response.data.token;
    Cookies.set('token', token, { expires: 7 }); // Store the token as a cookie for 7 days
    console.log('Token saved to cookies');
  } catch (error) {
    console.error('Login error:', error);
  }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;