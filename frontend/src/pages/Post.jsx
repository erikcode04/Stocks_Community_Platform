import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../agils/checkAuth";
import axios from "axios";
import "../styles/post.css";

function Post() {
    const { userInfo } = useContext(AuthContext);
    const [basicPost, setBasicPost] = useState(true);
    const [loading, setLoading] = useState(false);
    const [stateOfUpload, setStateOfUpload] = useState(false);
    const [failedStocks, setFailedStocks] = useState([]);
    const [post, setPost] = useState({
        subject: "",
        title: "",
        textAreaContent: "",
    });

    const [stockList, setStockList] = useState({
        stockOne: "",
        stockTwo: "",
        stockThree: "",
        stockFour: "",
        stockFive: "",
    });

    const handleStockList = (event) => {
        const { name, value } = event.target;
        setStockList({
            ...stockList,
            [name]: value,
        });
        console.log(stockList);
    }

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
                userId: userInfo.userId,
                subject: post.subject,
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
                        subject: "",
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

    async function uploadStockList(e) {
        e.preventDefault();
        console.log("stockList", stockList);
        try {
            const response = await axios.post("http://localhost:5000/posts/uploadStockList", stockList, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            console.log("response", response);
            if (response.data.failedStocks.length > 0) {
                setFailedStocks(response.data.failedStocks);
            } else {
                setFailedStocks([]);
            }
            displaySuccess();
            setStockList({
                stockOne: "",
                stockTwo: "",
                stockThree: "",
                stockFour: "",
                stockFive: "",
            });
            setLoading(false);
        } catch (error) {
            console.error("error", error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="post-contentContainer">
                <h1>Post</h1>
                {basicPost ? (
                    <div id="post-postBox">
                        <button className="post-basicPostButton" onClick={() => setBasicPost(false)}>Create a post</button>
                        <h2>Post</h2>
                        <form className="post-formForPost" onSubmit={submitPost}>
                            <div className="post-titleAreaContainer">
                                <label htmlFor="subject" className="post-subjectLabel">Subject:</label>
                                <input value={post.subject} onChange={handlePost} type="text" name="subject" className="post-subjectInput" required />
                                <label htmlFor="title" className="post-titleLabel">Title:</label>
                                <input value={post.title} onChange={handlePost} type="text" name="title" className="post-titleInput" required />
                            </div>
                            <div className="post-textAreaContainer">
                                <label htmlFor="content" className="post-postLabel">Content:</label>
                                <textarea value={post.textAreaContent} onChange={handlePost} name="textAreaContent" id="post-textArea" required />
                            </div>
                            {loading && <p>Loading...</p>}
                            <button className="post-submitButton" type="submit">
                                {stateOfUpload ? <p>uploaded </p> : <p>upload</p>}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="post-stockListContentContainer">
                        <button className="post-basicPostButton" onClick={() => setBasicPost(true)}>Back</button>
                        <h2>Stock List</h2>
                        <form className="post-formForStockList" onSubmit={uploadStockList}>
                            <div className="post-stockListContainer">
                                <label htmlFor="stockOne" className="post-stockLabel">Stock 1:</label>
                                <input value={stockList.stockOne} onChange={handleStockList} type="text" name="stockOne" className="post-stockInput" />
                                <label htmlFor="stockTwo" className="post-stockLabel">Stock 2:</label>
                                <input value={stockList.stockTwo} onChange={handleStockList} type="text" name="stockTwo" className="post-stockInput" />
                                <label htmlFor="stockThree" className="post-stockLabel">Stock 3:</label>
                                <input value={stockList.stockThree} onChange={handleStockList} type="text" name="stockThree" className="post-stockInput" />
                                <label htmlFor="stockFour" className="post-stockLabel">Stock 4:</label>
                                <input value={stockList.stockFour} onChange={handleStockList} type="text" name="stockFour" className="post-stockInput" />
                                <label htmlFor="stockFive" className="post-stockLabel">Stock 5:</label>
                                <input value={stockList.stockFive} onChange={handleStockList} type="text" name="stockFive" className="post-stockInput" />
                            </div>
                            {loading && <p>Loading...</p>}
                            <button className="post-submitButton" type="submit">
                                {stateOfUpload ? <p>uploaded </p> : <p>upload</p>}
                            </button>
                            {failedStocks.length > 0 && <p>Could not find stocks: {failedStocks.join(", ")}</p>}                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Post;