import { useContext, React, useState, useEffect } from 'react';
import { AuthContext } from '../agils/checkAuth';
import Navbar from '../components/Navbar';
import { profilePictures } from '../services/getProfilePictures';
import ChooseImage from '../components/ChooseImage';
import '../styles/profilePage.css';
import axios from 'axios';
import { handleLogout } from '../agils/logOut';
import FriendsButton from '../components/FriendsButton';

function ProfilePage() {
const { userInfo } = useContext(AuthContext);
const [profilePicture, setProfilePicture] = useState(null);
const [chooseImage, setChooseImage] = useState(false);
const [posts, setPosts] = useState([]);
const [stockPosts, setStockPosts] = useState([]); 
const [normalPostsMode, setNormalPostsMode] = useState(true);

useEffect(() => {
    console.log("heyyyy", userInfo);
    if (userInfo.profilePicture) {
        const foundImage = (profilePictures.find(picture => picture.name === userInfo.profilePicture));
        console.log("foundImage", foundImage);
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
        console.log("userInfo.userId", userInfo.userId);
        const response = await axios.get("http://localhost:5000/posts/getPostsByUserId", { params : { userId: userInfo.userId } });
        console.log("response", response);
        setPosts(response.data.posts);
        setStockPosts(response.data.stockLists);
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
            <div className="profilePage-posts">
                <h2>Posts</h2>
                <div className='profilePage-switchContainer'>
                <label className="feedPage-switch">
                    <input className="feedPage-toggle" type="checkbox" onClick={postsModeSwitch} />
                    <span className="feedPage-slider"></span>
                    <span className="feedPage-card-side"></span>
                </label>
                </div>
          {normalPostsMode ? <div>     {posts.map(post => (
                    <div key={post._id} className="profilePage-post">
                        <h3 className='profilePage-postTitle' >{post.title}</h3>
                        <p className='profilePage-postTextArea' >{post.textAreaContent}</p>
                        <button className='profilePage-deleteButton' onClick={() => deletePost(post)} > delete </button>
                    </div>
                ))} </div> : <div> {stockPosts.map(post => (
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
                ))} </div> }
        </div>
        <div className='profilePage-deleteAccountContainer'> 
            <button className='profilePage-deleteAccountButton' onClick={deleteAccount} > Delete Account </button>
        </div>
        </div>
        <FriendsButton />
        </div>
    );
}

export default ProfilePage;