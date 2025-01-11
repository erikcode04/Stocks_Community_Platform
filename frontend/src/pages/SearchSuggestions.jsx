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
        
        const fetchUsers = async () => {
            // Replace with actual API call
            setUsers([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
        };

        const fetchPosts = async () => {
            // Replace with actual API call
            setPosts([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
        };

        const fetchStockLists = async () => {
            // Replace with actual API call
            setStockLists([{ id: 1, name: 'Stock 1' }, { id: 2, name: 'Stock 2' }]);
        };

        fetchUsers();
        fetchPosts();
        fetchStockLists();
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
                            <div key={user.id} className="SearchSuggestions-item">
                                {user.name}
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'posts' && (
                    <div className="SearchSuggestions-posts">
                        {posts.map(post => (
                            <div key={post.id} className="SearchSuggestions-item">
                                {post.title}
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'stockLists' && (
                    <div className="SearchSuggestions-stockLists">
                        {stockLists.map(stock => (
                            <div key={stock.id} className="SearchSuggestions-item">
                                {stock.name}
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