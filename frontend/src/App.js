
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthContext} from "./agils/checkAuth";
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import Post from './pages/Post';
function App() {

const { isLoggedIn, isLoading } = useContext(AuthContext);

if (isLoading) {
  return <div>Loading...</div>;
}
if (!isLoggedIn) {
  console.log('User is not logged in');
}

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage/>} />
        <Route path="profilePage" element={isLoggedIn ? <ProfilePage/> : <LoginPage/>} />
        <Route path="post" element={isLoggedIn ? <Post/> : <LoginPage/>} />
      </Routes>
    </Router>
  );
  }
export default App;
