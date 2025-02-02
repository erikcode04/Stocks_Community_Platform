import React, {useState} from "react";
import axios from "axios";


import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chart from "../components/Chart";


const ChartPage = () => {
    const [portfolio, setPortfolio] = useState([]);

 async function countStockMentions() {
        try {
            const response = await axios.get("http://localhost:5000/posts/countStockMentions", {withCredentials: true});
            console.log("start fetch", response);
            setPortfolio(response.data);
        } catch (error) {
            console.log("Error fetching portfolio", error);
        }
    }

   





    return (
        <div>
            <Navbar />
            <div className="container">
            <h1>Chart Page</h1>
            <button onClick={countStockMentions}>Count Stock Mentions</button>
            </div>
        </div>
    );
    }

export default ChartPage;