import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/login.css";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedLogin] = useState(false);
  const naviate = useNavigate();

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
try {
   const response = await axios.post('http://localhost:5000/auth/login', { email, password }, { withCredentials: true });
    if (!response.status === 200) {
      console.error('Login failed:', response);
      setFailedLogin(true);
      return;
    }
    console.log('Response before error:', response);
      naviate('/');
 
  } catch (error) {
    console.error('Login error:', error);
    setFailedLogin(true);
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
        {failedLogin && <div className="login-failBox"><p id='login-failText'>Invalid email or password</p></div>}
        <button type="submit" className="login-button">Login</button>
      </form>
      
    </div>
  );
}

export default LoginPage;