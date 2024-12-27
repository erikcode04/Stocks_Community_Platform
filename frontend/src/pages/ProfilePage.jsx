import { useContext, React, useState, useEffect } from 'react';
import { AuthContext } from '../agils/checkAuth';
import Navbar from '../components/Navbar';
import { profilePictures } from '../services/getProfilePictures';
import ChooseImage from '../components/ChooseImage';
import '../styles/profilePage.css';
import axios from 'axios';


function ProfilePage() {
const { userInfo } = useContext(AuthContext);
const [profilePicture, setProfilePicture] = useState(null);
const [chooseImage, setChooseImage] = useState(false);
const [posts, setPosts] = useState([]);


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
        setPosts(response.data);
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
                {posts.map(post => (
                    <div key={post._id} className="profilePage-post">
                        <h3 className='profilePage-postTitle' >{post.title}</h3>
                        <p className='profilePage-postTextArea' >{post.textAreaContent}</p>
                        <button className='profilePage-deleteButton' onClick={() => deletePost(post)} > delete </button>
                    </div>
                ))}
        </div>
        </div>
        </div>
    );
}

export default ProfilePage;