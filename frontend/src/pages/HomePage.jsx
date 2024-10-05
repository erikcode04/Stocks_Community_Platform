import React from 'react';
import "../styles/homepage.css";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <div>
         <Navbar />
        <div> 
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our React application.</p>
      </div>
    </div>
  );
}

export default HomePage;