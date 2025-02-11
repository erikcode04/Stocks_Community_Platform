import React, { useEffect, useRef, useContext, useState } from 'react';
import "../styles/homepage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import coolDuck from "../assets/coolDuck.png";
import magnet from "../assets/magnet.png";
import newsPaper from "../assets/newspaper.png";
import topImage from "../assets/business.png";
import { Link } from 'react-router-dom';
import { AuthContext } from '../agils/checkAuth';
import FriendsButton from '../components/FriendsButton';
import axios from 'axios';

function HomePage() {

  const { userInfo } = useContext(AuthContext);
  const boxesContainerRef = useRef(null);
  const [userName, setUserName] = useState(null);
  const [showFriends, setShowFriends] = useState(true);
  

async function getUserName(){
  try {
    const response = await axios("http://localhost:5000/users/getUserName", {withCredentials : true})
    console.log("response",response)
    setUserName(response.data)
  } catch (error) {
    console.log("error", error);
  }
}

  useEffect(() => {
    getUserName()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );


    const boxesContainer = boxesContainerRef.current;
    if (boxesContainer) {
      observer.observe(boxesContainer);
    }

    return () => {
      if (boxesContainer) {
        observer.unobserve(boxesContainer);
      }
    };
  }, []);


  return (
    <div>
      <Navbar/>
      <div className='homePage-contentContainer'>
        <div id='homePage-topContainer'>
          <div id='homePage-topImageContainer'> 
          <img id='homePage-topImage' src={topImage} alt="Business" />
          </div>    
            <div className='homePage-basicBox'>
       {userInfo && <h1 id='homePage-header'>Hello {userName} </h1>}
        <p id='homePage-welcomingText'>There is always facts about stocks to share or read about</p>
        </div>
    
        </div>
        <div className='homePage-boxesContainer' ref={boxesContainerRef}>
          <div id='homePage-stocksPartBackround'>
            <div id='homePage-stocksBox'>
              <h2 className='homePage-boxesHeaders'>Stocks</h2>
              <div className='homePage-stocksImgNTextContainer'>
                <div className='homePage-textSideBox'>
                  <p className='homePage-textInsideBox'>
                    Welcome to the Stocks Page! Here you can explore and search for up-to-date stock information, track your favorite companies, and stay informed on market trends. Whether you're an investor or just curious about the stock market, our intuitive tools make it easy to find the data you need. Start your search and stay ahead of the market!
                  </p>
                  <Link to='/feed' id='homePage-linktoStocks'>Explore Stocks</Link>
                </div>
                <div className='homePage-photoHalfBox'>
                  <img className='homePage-photo' src={newsPaper} alt="Cool Duck" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     <FriendsButton />
      <Footer />
    </div>
  );
}

export default HomePage;