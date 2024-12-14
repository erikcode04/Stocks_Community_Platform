import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/feedPage.css";

const FeedPage = () => {
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        const response = await axios("http://localhost:5000/posts/getPosts");
        const data = await response.data;
        console.log(data);
        setPosts(data.reverse()); // Update state with fetched posts
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
                        <h2 className="feed-postTitle" >{post.title}</h2>
                        <p className="feed-postTextContent" > {post.textAreaContent}</p>
                        <p className="feed-postAuther"><strong>Author:</strong> {post.user.userName}</p>
                        <p className="feed-postCreatedDate" ><strong>Created:</strong> {new Date(post.created).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedPage;