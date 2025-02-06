import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/searchSuggestions.css";
import Navbar from "../components/Navbar";
import axios from 'axios';

const SearchSuggestions = () => {
    const { searchValue } = useParams();
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [stockLists, setStockLists] = useState([]);

    useEffect(() => {
        
        const fetchSuggestions = async () => {
            setStockLists([{ id: 1, name: 'Stock 1' }, { id: 2, name: 'Stock 2' }]);
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
                            <div key={user._id} className="SearchSuggestions-item">
                                {user.userName}
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'posts' && (
                    <div className="SearchSuggestions-posts">
                        {posts.map(post => (
                            <div key={post._id} className="SearchSuggestions-item">
                                {post.title}
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'stockLists' && (
                    <div className="SearchSuggestions-stockLists">
                        {stockLists.map(stock => (
                            <div key={stock.id} className="SearchSuggestions-item">
                                {stock.userName}
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