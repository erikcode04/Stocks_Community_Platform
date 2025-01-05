import React, { useState } from 'react';
import "./componentStyles/friendsButton.css";

const FriendsWindow = () => {
    const [isWindowVisible, setIsWindowVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('friends');

    const toggleWindow = () => {
        setIsWindowVisible(!isWindowVisible);
    };

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
                        {activeTab === 'friends' && <div>Friends List</div>}
                        {activeTab === 'friendRequests' && <div>Friend Requests List</div>}
                        {activeTab === 'sentFriendRequests' && <div>Sent Friend Requests List</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendsWindow;