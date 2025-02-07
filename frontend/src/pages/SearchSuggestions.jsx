import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/searchSuggestions.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { profilePictures } from "../services/getProfilePictures";

const SearchSuggestions = () => {
    const { searchValue } = useParams();
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [stockLists, setStockLists] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/searchSuggestions/${searchValue}`);
                console.log("response", response);
                setUsers(response.data.users);
                setPosts(response.data.suggestedPosts);
                setStockLists(response.data.suggestedStockPosts);
            } catch (error) {
                console.log("Error fetching search suggestions", error);
            }
        };

        fetchSuggestions();
    }, [searchValue]);

    return (
        <div> 
            <Navbar />
            <div className="SearchSuggestions-container">               
                <h1>Search Results for: {searchValue}</h1>  
                <div className="SearchSuggestions-tabs">
                    <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'SearchSuggestions-active' : ''}>Users</button>
                    <button onClick={() => setActiveTab('posts')} className={activeTab === 'posts' ? 'SearchSuggestions-active' : ''}>Posts</button>
                    <button onClick={() => setActiveTab('stockLists')} className={activeTab === 'stockLists' ? 'SearchSuggestions-active' : ''}>Stock Lists</button>
                </div>
                <div className="SearchSuggestions-content">
                    {activeTab === 'users' && (
                        <div className="SearchSuggestions-users">
                            {users.map(user => (
                                <div key={user.userId} className="SearchSuggestions-item">
                                            <Link to={`/visitProfilePage/${user.userId}`}> 
                                    <img
                                className="feed-postImage"
                                src={profilePictures.find(picture => picture.name === user.profilePicture)?.src}
                                alt="profile"
                            />
                             </Link> 
                                    {user.userName}
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'posts' && (
                        <div className="SearchSuggestions-posts">
                            {posts.map(post => (
                                <div key={post._id} className="SearchSuggestions-item">
                                            <Link to={`/visitProfilePage/${post.userId}`}> 
                                    <img
                                className="feed-postImage"
                                src={profilePictures.find(picture => picture.name === post.sanitizedUser.profilePicture)?.src}
                                alt="profile"
                            />
                             </Link> 
                                    {post.title}
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'stockLists' && (
                        <div className="SearchSuggestions-stockLists">
                            {stockLists.map(stock => (
                                <div key={stock._id} className="SearchSuggestions-item">
                                  <Link to={`/visitProfilePage/${stock.userId}`}> 
                                    <img
                                className="feed-postImage"
                                src={profilePictures.find(picture => picture.name === stock.sanitizedUser.profilePicture)?.src}
                                alt="profile"
                            />
                             </Link> 
                                    {stock.sanitizedUser.userName}
                                    <div>
                                        {stock.stockArray.map(stock => (
                                            
                                            <div key={stock.symbol}>
                                              <p>   {stock.symbol} </p>
                                              <p>   {stock.price} </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchSuggestions;