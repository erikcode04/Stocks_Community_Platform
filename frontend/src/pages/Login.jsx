import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../agils/checkAuth';
import "../styles/login.css";


function LoginPage() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedLogin] = useState(false);
  const navigate = useNavigate();

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
  setIsLoggedIn(true);
      navigate('/');
    
 
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
         <hr></hr>
         <div id='login-signupContainer'> 
          <p> Dont have an account? </p>
        <Link to='/signup' className='login-Link'>Signup</Link>
        </div>
      </form>
      
    </div>
  );
}

export default LoginPage;