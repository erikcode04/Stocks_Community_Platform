import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/feedPage.css";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AuthContext } from "../agils/checkAuth";
import { profilePictures} from "../services/getProfilePictures";
import { Link } from "react-router-dom";

const FeedPage = () => {
    const { userInfo } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        const response = await axios("http://localhost:5000/posts/getPosts");
        const data = await response.data;
        console.log(data);
        setPosts(data.reverse());
    }

   async function likePost(post) {
        const response = await axios.post("http://localhost:5000/posts/likePost", { postId: post._id, userId: userInfo.userId });
        console.log(response)
        updatePostLikes(post._id, userInfo.userId, true);
    }

    async function unlikePost(post) {
        const response = await axios.post("http://localhost:5000/posts/unlikePost", { postId: post._id, userId: userInfo.userId });
        console.log(response);
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


    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <Navbar />
            <div id="feed-contentContainer">
                <h1>Feed</h1>
                {userInfo.userId && <Link to="/createPost">Create Post</Link>}
                
                { userInfo && posts.map(post => (
                    <div key={post._id} className="feed-postContainer">
                        <h3 className="feed-postSubject" >{post.subject}</h3>
                        <h3 className="feed-postTitle" >{post.title}</h3>
                        <p className="feed-postTextContent" > {post.textAreaContent}</p>
                        <p className="feed-postAuther"><strong>Author:</strong> {post.user.userName}</p>
                        <Link key={post.user._id} to={`/visitProfilePage/${post.user._id}`}>
                to profile
            </Link>
                        <div className="feed-profilePicture">
                        <img
                            className="feed-postImage"
                            src={profilePictures.find(picture => picture.name === post.user.profilePicture)?.src}
                            alt="profile"
                        />                        </div>
                        <p className="feed-postCreatedDate" ><strong>Created:</strong> {new Date(post.created).toLocaleString()}</p>
                        <div>
                            <button className="feed-postButton"    onClick={() => {
                                    if (post.likes.includes(userInfo.userId)) {
                                        unlikePost(post);
                                    } else {
                                        likePost(post);
                                    }
                                }}> {post.likes.length}  {post.likes.includes(userInfo.userId) ? <AiFillLike /> : <AiOutlineLike />} </button>
                        </div>    
                    </div>
                )) }
            </div>
        </div>
    );
};

export default FeedPage;