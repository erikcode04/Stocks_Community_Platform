
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthContext} from "./agils/checkAuth";
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

function App() {

const { isLoggedIn, userInfo, isLoading } = useContext(AuthContext);

if (isLoading) {
  return <div>Loading...</div>;
}

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
  }
export default App;
