import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "../components/componentStyles/navbar.css";
import Footer from "../components/Footer";
import Nodata from "../components/Nodata";
import StaffCard from "../components/StaffCard";
import "../styles/aboutPage.css";

function AboutPage() {
  const [showHowBroke, setShowHowBroke] = useState(false);

 

    return (
        <div>
            <Navbar />
            <div className="aboutPage-Container">
                <h1>About Page</h1>
                <div className="aboutPage-staffContainer">
                    <h2 className="aboutPage-staffHeader">Staff</h2>
                    <div className="aboutPage-staff">
                        <StaffCard  content={{role : "CEO" }} />
                        <StaffCard content={{role : "Backend Developer" }} />
                        <StaffCard content={{role : "UI/UX designer" }} />
                        <StaffCard content={{role : "Frontend Developer" }} />
                   </div>
                </div>
                <div className="aboutPage-ExplenationContainer">
                    <p className="aboutPage-explenation">
                        Hey my is Erik and welcome to my website, I am a 20 year old guy that is 
                        in the beggining of my software development career. I have no budget for cool database stuff 
                        or any API key subscriptions so this website can be kinda cranky when it comes to uploading stock lists.
                          </p>
                </div>
                <div className="aboutPage-containerToShowHowBroke" >
                    <button className="aboutPage-buttonToShowHowBroke" onClick={() => setShowHowBroke(!showHowBroke)}>Click to see what I cant afford</button>
                    {showHowBroke && <Nodata />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AboutPage;