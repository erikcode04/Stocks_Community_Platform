import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FriendsButton from "../components/FriendsButton";
import PortfolioChart from "../components/Chart";
import "../styles/chartPage.css";

const ChartPage = () => {
  const [portfolioData, setPortfolio] = useState([]);

  useEffect(() => {
    async function countStockMentions() {
      try {
        const response = await axios.get("http://localhost:5000/posts/countStockMentions", { withCredentials: true });
        console.log("start fetch", response);
        setPortfolio(response.data);
      } catch (error) {
        console.log("Error fetching portfolio", error);
      }
    }
    countStockMentions();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="chartPage-container">
        <div className="chartPage-portFolioTopsDescriptionContainer" >
            <p className="chartPage-portfolioText" > 
                Here you can see the stocks you have been talking about the most.
                The more you talk about a stock, the bigger the slice of the pie
            </p>
        </div>
      {portfolioData && <PortfolioChart portfolioData={portfolioData} title="Dina mest omtalade aktier" />}
      <div className="chartPage-portFolioTopsDescriptionContainer" >
            <p className="chartPage-portfolioText" > 
                Here you can see the stocks you have been talking about the most.
                The more you talk about a stock, the bigger the slice of the pie
            </p>
        </div>
      </div>
     <FriendsButton />
      <Footer />
    </div>
  );
};

export default ChartPage;