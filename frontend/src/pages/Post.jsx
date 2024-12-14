import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../agils/checkAuth";
import axios from "axios";
import "../styles/post.css";

function Post() {
    const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [stateOfUpload, setStateOfUpload] = useState(false);
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

        const displaySuccess = () => {
            setStateOfUpload(true);
            setTimeout(() => {
                setStateOfUpload(false);
            }, 3000);
        }

    

    const submitPost = async (e) => {
        console.log("submitPost with values", post);
        try {
            setLoading(true);
        const postBox = {
            userId : userInfo.userId,
            title: post.title,
            textAreaContent: post.textAreaContent,
        }
        console.log("postBox", postBox);
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/posts/post/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: postBox,
        })
        .then((response) => {
            console.log("response", response);
            displaySuccess();
            setPost({
                title: "",
                textAreaContent: "",
            });
            setLoading(false);
        })
         .catch((error) => {
            console.error("error", error);
        });

    }
    catch (error) {
        console.error("error", error);
    }
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
                {loading && <p>Loading...</p>}
                <button className="post-submitButton" type="submit"> 
                {stateOfUpload ? <p>uploaded </p> : <p>upload</p> } 
                </button>
            </form>
        </div>
        </div>
        </div>
    );
    }
 export default Post;

    