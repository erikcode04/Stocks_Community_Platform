import { useContext, React, useState, useEffect } from 'react';
import { AuthContext } from '../agils/checkAuth';
import Navbar from '../components/Navbar';
import { profilePictures } from '../services/getProfilePictures';
import ChooseImage from '../components/ChooseImage';
import '../styles/profilePage.css';


function ProfilePage() {
const { userInfo } = useContext(AuthContext);
const [profilePicture, setProfilePicture] = useState(null);
const [chooseImage, setChooseImage] = useState(false);


useEffect(() => {
    console.log("heyyyy", userInfo);
    if (userInfo.profilePicture) {
        const foundImage = (profilePictures.find(picture => picture.name === userInfo.profilePicture));
        console.log("foundImage", foundImage);
        setProfilePicture(foundImage.src);
       
    }
}
, [userInfo.profilePicture]);

    return (
      <div> 
        <Navbar />
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profilePage-chooseImageContainer">
            {chooseImage && <ChooseImage />}
            </div>
            <div className='profilePage-profilePictureContainer'>
                <img src={profilePicture} alt="Profile" />
            </div>
            <button onClick={() => setChooseImage(!chooseImage)} className="profilePage-chooseImageButton">
                Choose Profile Picture
            </button>
            <div className="profile-details">
                <p><strong>Username:</strong> {userInfo.userName}</p>

                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Joined:</strong> {new Date(userInfo.joinedDate).toLocaleDateString()}</p>
            </div>
        </div>
        </div>
    );
}

export default ProfilePage;