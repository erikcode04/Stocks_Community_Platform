import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/login.css";

function SignupPage() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Username:', userName);
    console.log('Password:', password);
try {
   const response = await axios.post('http://localhost:5000/auth/signup', { email, userName, password });
   console.log("response");
    console.log("response", response.data);
    alert('Signup successful');
    window.location.href = '/login';
    
}
catch (error) {
  console.error(error);
  alert('Signup failed');
}
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
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
          <label htmlFor="password">User Name:</label>
          <input
            type="text"
            id="password"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
        <button type="submit" className="login-button">Signup</button>
        <div id='login-signupContainer'> 
          <p> Already have an account? </p>
        <Link to='/login' className='login-Link'>Login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;