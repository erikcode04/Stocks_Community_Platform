import React, {useState ,useEffect} from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/feedPage.css";

const FeedPage = () => {

   async function fetchPosts() {
       const response = await axios("http://localhost:5000/posts/getPosts");
        const data = await response.data;
        console.log(data);
        
    }

 useEffect(() => {
    fetchPosts();
    }, []);



    return (
        <div>
            <Navbar />
            <div id="feed-contentContainer"> 
        <h1>Feed</h1>
        </div>
        </div>
    );
    };


export default FeedPage;