import { useContext, React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../agils/checkAuth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { profilePictures } from '../services/getProfilePictures';
import ChooseImage from '../components/ChooseImage';
import '../styles/profilePage.css';
import axios from 'axios';
import { handleLogout } from '../agils/logOut';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import FriendsButton from '../components/FriendsButton';
import Chart from "../components/Chart";






function ProfilePage() {
const { userInfo } = useContext(AuthContext);
const [profilePicture, setProfilePicture] = useState(null);
const [chooseImage, setChooseImage] = useState(false);
const [posts, setPosts] = useState([]);
const [stockPosts, setStockPosts] = useState([]); 
const [normalPostsMode, setNormalPostsMode] = useState(true);
const [stockPages, setStockPages] = useState(1);
const [postsPages, setPostsPages] = useState(1);
const [postCurrentPage, setPostCurrentPage] = useState(1);
const [postStartIndex, setPostStartIndex] = useState(0);
const [postEndIndex, setPostEndIndex] = useState(5);

const [stockPostostCurrentPage, setStockPostostCurrentPage] = useState(1);
const [stockPostStartIndex, setStockPostStartIndex] = useState(0);
const [stockPostEndIndex, setStockPostEndIndex] = useState(5);
const stockPostStartIndexRef = useRef(5);
const stockPostEndIndexRef = useRef(10);
const stockScrolledPages = useRef(1);


const postStartIndexRef = useRef(5);
const postEndIndexRef = useRef(10);
const scrolledPages = useRef(1);



useEffect(() => {
    if (userInfo.profilePicture) {
        const foundImage = (profilePictures.find(picture => picture.name === userInfo.profilePicture));
        setProfilePicture(foundImage.src);
       
    }
}
, [userInfo.profilePicture]);

useEffect(() => {
    getUserPosts();
}
, []);




async function getUserPosts() {
    try {
        const response = await axios.get("http://localhost:5000/posts/getPostsByUserId", { params : { userId: userInfo.userId } });
        console.log("start fetch", response);
        setPosts(response.data.posts);
        setStockPosts(response.data.stockLists);
        setPostsPages(response.data.postCount);
        setStockPages(response.data.stockListCount);
        console.log("stockPostsLength", response.data.stockListLength);
        postStartIndexRef.current = response.data.postsLength -5; 
        stockPostStartIndexRef.current = response.data.stockListLength -5; 
    } catch (error) {
        console.error('Error getting posts:', error);
    }
}


async function deletePost(post) {
    try {
    console.log("post", post);
    const response = await axios.delete("http://localhost:5000/posts/deletePost", { data: { post }, withCredentials: true });
    if (response.status === 200) {
        const newPosts = posts.filter(p => p._id !== post._id);
        setPosts(newPosts);
        if (posts % 5 === 0) {
            setPostStartIndex(postStartIndex - 5);
            setPostEndIndex(postEndIndex - 5);
            setPostCurrentPage(postCurrentPage - 1);
            setPostsPages(postsPages - 1);
        }
    }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

async function deleteAccount() {
    try {
        const response = await axios.delete("http://localhost:5000/users/deleteAccount", { withCredentials: true });
        if (response.status === 200) {
            const logOutResponse = await handleLogout();
            if (logOutResponse.ok === false) {
          alert('Failed to log out, you have to logout manually:(');
        }
    }
}
catch (error) {
    console.error('Error deleting account:', error);
}
}

function postsModeSwitch(event) {
    console.log("event.target.checked", event.target.checked);
    if (event.target.checked) {
        setNormalPostsMode(false);
    } else {
        setNormalPostsMode(true);
    }
}

async function nextPostPageHandler() {
    if (postsPages > 1){
        if (postCurrentPage === postsPages) {
            return;
        }
            
    if (postsPages > scrolledPages.current) {
    try {
        const response = await axios.get("http://localhost:5000/posts/getMorePostsByUserId", { params : { userId: userInfo.userId, startIndex: postStartIndexRef.current } });
        setPosts([...posts, ...response.data]);
            scrolledPages.current += 1;
       setPostCurrentPage(postCurrentPage + 1);
        postStartIndexRef.current -= 5;
        setPostStartIndex(postStartIndex + 5);
        setPostEndIndex(postEndIndex + 5);
        
    } catch (error) {
     console.error('Error getting more posts:', error);   
    }
}
else {
    setPostStartIndex(postStartIndex + 5);
        setPostEndIndex(postEndIndex + 5);
        setPostCurrentPage(postCurrentPage + 1);
        scrolledPages.current += 1;
        postStartIndexRef.current += 5;
}
}
}

function beforePagePostHandler() {
if (postCurrentPage > 1) {
    setPostCurrentPage(postCurrentPage - 1);
    setPostStartIndex(postStartIndex - 5);
    setPostEndIndex(postEndIndex - 5);
}
}

//----------------------------------------------

async function nextStockPostPageHandler() {
    if (postsPages > 1){
        if (stockPostostCurrentPage === stockPages) {
            return;
        }
            
    if (stockPages > stockScrolledPages.current) {
    try {
        const response = await axios.get("http://localhost:5000/posts/getMoreStockPostsByUserId", { params : { userId: userInfo.userId, startIndex: stockPostStartIndexRef.current } });
        console.log("response", response);
        setStockPosts([...stockPosts, ...response.data]);
        stockScrolledPages.current += 1;
       setStockPostostCurrentPage(stockPostostCurrentPage + 1);
        stockPostStartIndexRef.current -= 5;
        setStockPostStartIndex(stockPostStartIndex + 5);
        setStockPostEndIndex(stockPostEndIndex + 5);
        
    } catch (error) {
     console.error('Error getting more posts:', error);   
    }
}
else {
    setStockPostStartIndex(stockPostStartIndex + 5);
    setStockPostEndIndex(stockPostEndIndex + 5);
        setStockPostostCurrentPage(stockPostostCurrentPage + 1);
        stockScrolledPages.current += 1;
        stockPostStartIndexRef.current += 5;
}
}
}

function beforePageStockPostHandler() {
    console.log("one");
    console.log("stockPostostCurrentPage", stockPostostCurrentPage);
if (stockPostostCurrentPage > 1) {
    console.log("two", stockPosts);
    console.log("stockPostStartIndex", stockPostStartIndex);
    console.log("stockPostEndIndex", stockPostEndIndex);
    setStockPostostCurrentPage(stockPostostCurrentPage - 1);
    setStockPostStartIndex(stockPostStartIndex - 5);
    setStockPostEndIndex(stockPostEndIndex - 5);
    console.log("three", stockPosts);
}
}




    return (
      <div> 
        <Navbar />
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-details">
            <div className="profilePage-chooseImageContainer">
            {chooseImage && <ChooseImage />}
            </div>
            <div className='profilePage-profilePictureContainer'>
                <img src={profilePicture} alt="Profile" />
            </div>
            <button onClick={() => setChooseImage(!chooseImage)} className="profilePage-chooseImageButton">
                Change Profile Picture
            </button>
                <p><strong>Username:</strong> {userInfo.userName}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Joined:</strong> {new Date(userInfo.joinedDate).toLocaleDateString()}</p>
            </div>
            <Link to="/chartPage" className="profilePage-chartLink"> Go to Chart Page </Link>
            <div className="profilePage-posts">
                <h2>Posts</h2>
                <div className='profilePage-switchContainer'>
                <label className="feedPage-switch">
                    <input className="feedPage-toggle" type="checkbox" onClick={postsModeSwitch} />
                    <span className="feedPage-slider"></span>
                    <span className="feedPage-card-side"></span>
                </label>
                </div>
          {normalPostsMode ? <div>     {posts.slice(postStartIndex, postEndIndex).reverse().map(post => (
                    <div key={post._id} className="profilePage-post">
                        <h3 className='profilePage-postTitle' >{post.title}</h3>
                        <p className='profilePage-postTextArea' >{post.textAreaContent}</p>
                        <button className='profilePage-deleteButton' onClick={() => deletePost(post)} > delete </button>
                    </div>

                ))} <div className='profilePage-changePageContainer'>
                    <p className='profilePage-postsPageNumber'>  1 </p>
                <button className='profilePage-switchPostsPageButton' onClick={beforePagePostHandler}  > <FaArrowLeft/> </button>
                <p className='profilePage-postsPageNumber'> {postCurrentPage} </p>
                <button className='profilePage-switchPostsPageButton'onClick={nextPostPageHandler} > <FaArrowRight/> </button>
                <p className='profilePage-postsPageNumber'> {postsPages}</p>
                     </div>
                 </div> 
                : <div> {stockPosts.slice(stockPostStartIndex, stockPostEndIndex).map(post => (
                    <div key={post._id} className="profilePage-post">
                        <h3 className='profilePage-postTitle' >{post.title}</h3>
                        <p className='profilePage-postTextArea' >{post.textAreaContent}</p>
                        {post.stockArray.map(stock => (
                        <div key={stock.symbol}>
                            <p  className='profilePage-stockList' >{stock.symbol}</p>
                            <p  className='profilePage-stockList' >{stock.price}</p>
                              </div>
                        ))}
                    </div>
                ))} 
               <div className='profilePage-changePageContainer'>
                    <p className='profilePage-postsPageNumber'>  1 </p>
                <button className='profilePage-switchPostsPageButton' onClick={beforePageStockPostHandler}  > <FaArrowLeft/> </button>
                <p className='profilePage-postsPageNumber'> {stockPostostCurrentPage} </p>
                <button className='profilePage-switchPostsPageButton'onClick={nextStockPostPageHandler} > <FaArrowRight/> </button>
                <p className='profilePage-postsPageNumber'> {stockPages}</p>
                     </div>
                 </div> }
        </div>
        <div className='profilePage-deleteAccountContainer'> 
            <button className='profilePage-deleteAccountButton' onClick={deleteAccount} > Delete Account </button>
        </div>
        </div>
        <FriendsButton />
        <Footer />
        </div>
    );
}

export default ProfilePage;