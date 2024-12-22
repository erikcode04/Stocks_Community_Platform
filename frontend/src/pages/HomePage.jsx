import React, { useEffect, useRef, useContext } from 'react';
import "../styles/homepage.css";
import Navbar from "../components/Navbar";
import coolDuck from "../assets/coolDuck.png";
import magnet from "../assets/magnet.png";
import newsPaper from "../assets/newspaper.png";
import topImage from "../assets/business.png";
import { Link } from 'react-router-dom';
import { AuthContext } from '../agils/checkAuth';

function HomePage() {

  const { userInfo } = useContext(AuthContext);
  const boxesContainerRef = useRef(null);
  useEffect(() => {
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
       {userInfo && <h1 id='homePage-header'>Hello {userInfo.userName} </h1>}
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
                  <img className='homePage-photo' src={coolDuck} alt="Cool Duck" />
                </div>
              </div>
            </div>
          </div>

          <div id='homePage-physicsBox'>
            <h2 className='homePage-boxesHeaders'>Physics</h2>
            <div className='homePage-physicsImgNTextContainer'>
              <div className='homePage-photoHalfBox'>
                <img className='homePage-photo' src={magnet} alt="Magnet" />
              </div>
              <div className='homePage-textSideBox'>
                <p className='homePage-textInsideBox'>
                  Welcome to the Physics Exploration Page! Here you can delve into the fascinating world of physics, explore concepts from quantum mechanics to classical mechanics, and stay informed on the latest discoveries in the field. Whether you're a student, researcher, or just curious about how the universe works, our intuitive tools make it easy to find the knowledge you need. Start exploring and uncover the laws that govern everything around us!
                </p>
                <Link to='/physics' id='homePage-linktoPhysics'>Explore Physics</Link>
              </div>
            </div>
          </div>

          <div id='homePage-spacePartBackround'>
            <div id='homePage-spaceBox'>
              <h2 className='homePage-boxesHeaders'>News</h2>
              <div className='homePage-spaceImgNTextContainer'>
                <div className='homePage-textSideBox'>
                  <p className='homePage-textInsideBox'>
                    Welcome to the Space Exploration Page! Here you can dive into the wonders of the cosmos, explore planets, stars, and galaxies, and stay informed on the latest space discoveries. Whether you're a space enthusiast or just curious about the universe, our intuitive tools make it easy to find the information you seek. Start your journey and unlock the mysteries of the cosmos!
                  </p>
                  <div className='homePage-linktoSpaceContainer'> 
                  <Link to='/space' id='homePage-linktoSpace'>Explore Space</Link>
                  </div>
                </div>
                <div className='homePage-photoHalfBox'>
                  <img className='homePage-photo' src={newsPaper} alt="Weird Alien" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;