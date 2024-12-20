import React, { useState, useContext } from 'react';
import axios from 'axios';
import './componentStyles/chooseImage.css';
import { profilePictures } from '../services/getProfilePictures';
import { AuthContext } from '../agils/checkAuth';

const ProfilePictureGrid = () => {
    const { userInfo } = useContext(AuthContext);
  const [selectedPicture, setSelectedPicture] = useState(null);

    const handleButtonClick = (pictureName) => {
        console.log(`Selected profile picture: ${pictureName}`);
        setSelectedPicture(pictureName);
    };

    const handleSelect = async () => {
        console.log(`Selected profile picture: ${selectedPicture}`);
        try {
            const res = await axios.post(
                'http://localhost:5000/users/setProfilePicture',
                { profilePicture: selectedPicture, userInfo },
                { withCredentials: true }
            );
            console.log(res);
            window.location.reload();
        } catch (error) {
            console.log(error);
        } finally {
            console.log('Profile picture updated');
        }
    };





    return (
        <div className='chooseImage-outerContainer'> 
        <div className="chooseImage-grid-container">
            {profilePictures.map((picture, index) => (
                <div key={index} className="chooseImage-grid-item">
                    <button onClick={() => handleButtonClick(picture.name)} className="chooseImage-button">
                        <img src={picture.src} alt={`profile-${index}`} className="chooseImage-profile-picture" />
                    </button>
                </div>
            ))}   
        </div>
        <button onClick={() => handleSelect(selectedPicture)} className="chooseImage-submitButton">
             select
            </button>   
        </div>
    );
};

export default ProfilePictureGrid;