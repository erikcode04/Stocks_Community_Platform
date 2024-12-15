import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/feedPage.css";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";


const FeedPage = () => {
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        const response = await axios("http://localhost:5000/posts/getPosts");
        const data = await response.data;
        console.log(data);
        setPosts(data.reverse()); // Update state with fetched posts
    }

   async function likePost(event) {
      
        console.log("likePost with postId", event._id);
    }



    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <Navbar />
            <div id="feed-contentContainer">
                <h1>Feed</h1>
                {posts.map(post => (
                    <div key={post._id} className="feed-postContainer">
                        <h3 className="feed-postTitle" >{post.subject}</h3>
                        <h3 className="feed-postTitle" >{post.title}</h3>
                        <p className="feed-postTextContent" > {post.textAreaContent}</p>
                        <p className="feed-postAuther"><strong>Author:</strong> {post.user.userName}</p>
                        <p className="feed-postCreatedDate" ><strong>Created:</strong> {new Date(post.created).toLocaleString()}</p>
                        <div>
                            <button className="feed-postButton" onClick={() => likePost(post)}> <AiOutlineLike/> </button>
                        </div>    
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedPage;