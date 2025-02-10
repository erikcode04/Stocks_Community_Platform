import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/feedPage.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { AuthContext } from "../agils/checkAuth";
import { profilePictures } from "../services/getProfilePictures";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";


const FeedPage = () => {
    const { userInfo } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [feedMode, setFeedMode] = useState("Standard Posts");
    const [stockPosts, setStockPosts] = useState([]);
    const stockPostsStartIndex = useRef(0);
    const normalPostsStartIndex = useRef(0);
    let feedModeSwitch = useRef("normal");
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);



    async function startFetch() {
        try {
            const response = await axios("http://localhost:5000/posts/startFetchForFeedPage");
            console.log("response", response);
            setPosts(response.data.posts.reverse());
            normalPostsStartIndex.current = response.data.startIndex;
        } 
        catch (error) {
            console.error(error);
        }
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
        console.log("event", event.target.checked);
        stockPostsStartIndex.current = 0;
        if (event.target.checked) {
            setFeedMode("Stock Posts");
            feedModeSwitch.current = "stocks";
            try {
                const response = await axios(`http://localhost:5000/posts/getStockLists/0`);
                console.log("response", response);
                setStockPosts(response.data);
                stockPostsStartIndex.current = 10; 
                console.log("stockPostsStartIndex", stockPostsStartIndex.current);
            } catch (error) {
                console.error(error);
            }
        } else {
            setFeedMode("Standard Posts");
        }
        if (event.target.checked === false) {
            feedModeSwitch.current = "normal";
            console.log("unchecked");
          
        }
    }

    useEffect(() => {
        startFetch();
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
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !loading && !isFetching && !isTimerActive &&  feedModeSwitch.current === "stocks") {
            console.log("about to fetch stock posts");
            fetchMorePosts();
        }
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !loading && !isFetching && !isTimerActive &&  feedModeSwitch.current === "normal") {
            console.log("about to fetch normal posts");
            fetchMoreNormalPosts();
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
            stockPostsStartIndex.current += 10;
            console.log("stockPostsStartIndex", stockPostsStartIndex.current);
        } catch (error) {
            console.error("Error fetching more posts.", error);
        } finally {
            await timer;
            setLoading(false);
            setIsFetching(false);
            setIsTimerActive(false);
        }
    }

    async function fetchMoreNormalPosts() {
        setLoading(true);
        setIsFetching(true);
        setIsTimerActive(true);
        const timer = new Promise(resolve => setTimeout(resolve, 5000));
        try {
            console.log("normalPostsStartIndex before", normalPostsStartIndex.current);
            const currentStartIndex = normalPostsStartIndex.current;
            const response = await axios(`http://localhost:5000/posts/getPosts/${currentStartIndex}`);
            if (response.data.length === 0) {
                setLoading(false);
                setIsFetching(false);
                setIsTimerActive(false);
                return;
            }
            setPosts(prevPosts => [...prevPosts, ...response.data]);
            normalPostsStartIndex.current -= 10;
            console.log("stockPostsStartIndex", normalPostsStartIndex.current);
        } catch (error) {
            console.error("Error fetching more posts.", error);
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
                        <h3 className="feed-stockPostSubject">{post.subject}</h3>
                        <h3 className="feed-stockPostTitle">{post.title}</h3>
                        <p className="feed-stockPostTextContent">{post.textAreaContent}</p>
                        <p className="feed-stockPostAuther"><strong>Author:</strong> {post.user.userName}</p>
                        <div className="feed-stockPostprofilePicture">
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
                        <p className="feed-postCreatedDate"><strong>Created:</strong> {new Date(post.uploadDate).toLocaleString()}</p>
                    </div>
                ))}
                {loading && <Loader />}
                
            </div>
            {userInfo.userId && <Link className="feedPage-createPostButton" to="/post">
            <div className="svg-wrapper-1">
    <div className="svg-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fill="currentColor"
          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
        ></path>
      </svg>
    </div>
  </div>
  <span>Post</span>
                </Link>}
        </div>
    );
};

export default FeedPage;