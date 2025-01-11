import React, { useState, useEffect } from 'react';
import './componentStyles/friendsButton.css';
import axios from 'axios';
import { profilePictures } from '../services/getProfilePictures';
import { Link } from 'react-router-dom'

const FriendsWindow = () => {
    const [isWindowVisible, setIsWindowVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('friends');
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [sentFriendRequests, setSentFriendRequests] = useState([]);

    const toggleWindow = () => {
        setIsWindowVisible(!isWindowVisible);
    };


    useEffect(() => {
        async function fetchData() {
         try {
            const response = await axios.get('http://localhost:5000/users/getFriendStatus', {withCredentials: true});
            console.log('Friends data:', response.data);
            setFriends(response.data.friends);
            setFriendRequests(response.data.friendRequests);
            setSentFriendRequests(response.data.sentFriendRequests);
        } catch (error) {
            console.error('Error fetching friends data:', error);
        }
        }
        fetchData();
    }
, []);

    return (
        <div>
            <button id="friendsButton-button" onClick={toggleWindow}>Friends</button>
            {isWindowVisible && (
                <div id="friendsWindow">
                    <div className="tabs">
                        <button onClick={() => setActiveTab('friends')} className={activeTab === 'friends' ? 'active' : ''}>Friends</button>
                        <button onClick={() => setActiveTab('friendRequests')} className={activeTab === 'friendRequests' ? 'active' : ''}>Friend Requests</button>
                        <button onClick={() => setActiveTab('sentFriendRequests')} className={activeTab === 'sentFriendRequests' ? 'active' : ''}>Sent Friend Requests</button>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'friends' && <div>
                   
                                {friends.map(friend => (
                                    <Link key={friend.userId} to={`/visitProfilePage/${friend.userId}`}>  
                                    <img src={profilePictures.find(picture => picture.name === friend.profilePicture)?.src} alt={`${friend.userName}'s profile`} className='profile-picture' />
                                    {friend.userName}
                                    </Link> 
                                ))}
                         
                            </div>}
                        {activeTab === 'friendRequests' && <div>
                        <ul>
                                {friendRequests.map(friendRequest => (
                                    <Link key={friendRequest.userId} to={`/visitProfilePage/${friendRequest.userId}`}>  
                                    <img src={profilePictures.find(picture => picture.name === friendRequest.profilePicture)?.src} alt={`${friendRequest.userName}'s profile`} className='profile-picture' />
                                    {friendRequest.userName}
                               </Link>
                                ))}
                            </ul>
                            </div>}
                        {activeTab === 'sentFriendRequests' && <div>
                        {sentFriendRequests.map(sentFriendRequest => (
                             <Link key={sentFriendRequest.userId} to={`/visitProfilePage/${sentFriendRequest.userId}`}>  
                                    <img src={profilePictures.find(picture => picture.name === sentFriendRequest.profilePicture)?.src} alt={`${sentFriendRequest.userName}'s profile`} className='profile-picture' />
                                    {sentFriendRequest.userName}
                                    </Link>
                                ))}
                            </div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendsWindow;