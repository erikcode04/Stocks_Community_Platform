import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/feedPage.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { AuthContext } from "../agils/checkAuth";
import { profilePictures } from "../services/getProfilePictures";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Nodata from "../components/Nodata";

const FeedPage = () => {
    const { userInfo } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [feedMode, setFeedMode] = useState("Standard Posts");
    const [stockPosts, setStockPosts] = useState([]);
    const stockPostsStartIndex = useRef(0);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [nodata, setNodata] = useState(false);

    async function fetchPosts() {
        const response = await axios("http://localhost:5000/posts/getPosts");
        const data = await response.data;
        setPosts(data.reverse());
    }

    async function likePost(post) {
        const response = await axios.post("http://localhost:5000/posts/likePost", { postId: post._id, userId: userInfo.userId });
        updatePostLikes(post._id, userInfo.userId, true);
    }

    async function unlikePost(post) {
        const response = await axios.post("http://localhost:5000/posts/unlikePost", { postId: post._id, userId: userInfo.userId });
        updatePostLikes(post._id, userInfo.userId, false);
    }

    function updatePostLikes(postId, userId, isLike) {
        setPosts(prevPosts => 
            prevPosts.map(post => 
                post._id === postId 
                    ? { ...post, likes: isLike ? [...post.likes, userId] : post.likes.filter(id => id !== userId) } 
                    : post
            )
        );
    }

    async function postsSwitch(event) {
        stockPostsStartIndex.current = 0;
        if (event.target.checked) {
            setFeedMode("Stock Posts");
            try {
                const response = await axios(`http://localhost:5000/posts/getStockLists/0`);
                console.log("response", response);
                setStockPosts(response.data);
                stockPostsStartIndex.current = 50; 
                console.log("stockPostsStartIndex", stockPostsStartIndex.current);
            } catch (error) {
                console.error(error);
            }
        } else {
            setFeedMode("Standard Posts");
        }
    }

    useEffect(() => {
        fetchPosts();
        const debouncedHandleScroll = debounce(handleScroll, 200);
        window.addEventListener('scroll', debouncedHandleScroll);
        return () => window.removeEventListener('scroll', debouncedHandleScroll);
    }, []);

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !loading && !isFetching && !isTimerActive) {
            fetchMorePosts();
        }
    }

    async function fetchMorePosts() {
        setLoading(true);
        setIsFetching(true);
        setIsTimerActive(true);
        const timer = new Promise(resolve => setTimeout(resolve, 5000));
        try {
            console.log("stockPostsStartIndex before", stockPostsStartIndex.current);
            const currentStartIndex = stockPostsStartIndex.current; // Capture the current value
            const response = await axios(`http://localhost:5000/posts/getStockLists/${currentStartIndex}`);
            console.log("currentStartIndex", currentStartIndex);
            console.log("stockPostsStartIndex", stockPostsStartIndex.current);
            console.log("response", response);
            if (response.data.length === 0) {
                setLoading(false);
                setIsFetching(false);
                setIsTimerActive(false);
                return;
            }
            setStockPosts(prevPosts => [...prevPosts, ...response.data]);
            stockPostsStartIndex.current += 50;
            console.log("stockPostsStartIndex", stockPostsStartIndex.current);
        } catch (error) {
            console.error("Error fetching more posts.", error);
            setNodata(true);
        } finally {
            await timer;
            setLoading(false);
            setIsFetching(false);
            setIsTimerActive(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div id="feed-contentContainer">
                <h1 className="feedPage-header">{feedMode}</h1>
                <label className="feedPage-switch">
                    <Nodata/>
                    <input className="feedPage-toggle" type="checkbox" onClick={postsSwitch} />
                    <span className="feedPage-slider"></span>
                    <span className="feedPage-card-side"></span>
                </label>
                {userInfo && feedMode === "Standard Posts" && posts.map(post => (
                    <div key={post._id} className="feed-postContainer">
                        <h3 className="feed-postSubject">{post.subject}</h3>
                        <h3 className="feed-postTitle">{post.title}</h3>
                        <p className="feed-postTextContent">{post.textAreaContent}</p>
                        <p className="feed-postAuther"><strong>Author:</strong> {post.user.userName}</p>
                        <Link key={post.user._id} to={`/visitProfilePage/${post.user._id}`} className="feedPage-visitProfileLink" >Visit Proifle</Link>
                        <div className="feed-profilePicture">
                            <img
                                className="feed-postImage"
                                src={profilePictures.find(picture => picture.name === post.user.profilePicture)?.src}
                                alt="profile"
                            />
                        </div>
                        <p className="feed-postCreatedDate"><strong>Created:</strong> {new Date(post.created).toLocaleString()}</p>
                        <div>
                            <button className="feed-postButton" onClick={() => {
                                if (post.likes.includes(userInfo.userId)) {
                                    unlikePost(post);
                                } else {
                                    likePost(post);
                                }
                            }}>
                                {post.likes.length} {post.likes.includes(userInfo.userId) ? <AiFillLike /> : <AiOutlineLike />}
                            </button>
                        </div>
                    </div>
                ))}
                {userInfo && feedMode === "Stock Posts" && stockPosts.map(post => (
                    <div key={post._id} className="feedPage-stockCard">
                        <h3 className="feed-postSubject">{post.subject}</h3>
                        <h3 className="feed-postTitle">{post.title}</h3>
                        <p className="feed-postTextContent">{post.textAreaContent}</p>
                        <p className="feed-postAuther"><strong>Author:</strong> {post.user.userName}</p>
                        <div className="feed-profilePicture">
                            <img
                                className="feed-postImage"
                                src={profilePictures.find(picture => picture.name === post.user.profilePicture)?.src}
                                alt="profile"
                            />
                        </div>
                        <div>
                            {post.stockArray.map((stock, index) => (
                                <div key={index} className="feedPage-stockList">
                                    <p className="feedPage-stockListName">{stock.symbol}</p>
                                    <p className="feedPage-stockListPrice">{stock.price}</p>
                                </div>
                            ))}
                        </div>
                        <p className="feed-postCreatedDate"><strong>Created:</strong> {new Date(post.created).toLocaleString()}</p>
                    </div>
                ))}
                {loading && <Loader />}
                
            </div>
            {userInfo.userId && <Link className="feedPage-createPostButton" to="/post">Upload Post</Link>}
        </div>
    );
};

export default FeedPage;