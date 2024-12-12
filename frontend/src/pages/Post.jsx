import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/post.css";
function Post() {
  const [post , setPost] = useState({
    title: "",
    textAreaContent: "",
    });


        const handlePost = (event) => {
            const { name, value } = event.target;
            setPost({
                ...post,
                [name]: value,
            });
            console.log(post);
        }
    

    const submitPost = async (e) => {
        console.log("submitPost with values", post);
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/posts/post/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        })
        .then((response) => {
            console.log("response", response);
        })
    }





    return (
        <div>
        <Navbar />
        <div className="post-contentContainer">
        <h1>Post</h1>
        <div id="post-postBox"> 
            <h2>Post</h2>
            <form className="post-formForPost" onSubmit={submitPost}>
                <div className="post-titleAreaContainer">
                    <label htmlFor="title">Title:</label>
                    <input value={post.title} onChange={handlePost} type="text" name="title" id="title" required />
                </div>
                <div className="post-textAreaContainer">
                    <label htmlFor="content">Content:</label>
                    <textarea value={post.textAreaContent} onChange={handlePost} name="textAreaContent" id="post-textArea" required />
                </div>
                <button className="post-submitButton" type="submit">Upload</button>
            </form>
        </div>
        </div>
        </div>
    );
    }
 export default Post;

    