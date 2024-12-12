import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa"; 

import "./componentStyles/navbar.css";
import {handleLogout} from "../agils/logOut";
function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    async function calllogOut() {
        const response = await handleLogout();
        if (response.ok) {
            console.log('Logged out successfully');
        } else {
            console.error('Failed to log out');
            return response;
        }
    }

    return (
        <nav id='nav-container'>
            <div id='nav-logoContainer'>
                <a id='nav-homeLink' href='/'> 
                    <h1 id='nav-homeLinkText'> Home </h1>
                </a>
            </div>
            <div id='nav-hamburger' onClick={toggleMobileMenu}>
                <FaBars />
            </div>
            <ul id='nav-list' className={isMobileMenuOpen ? 'active' : ''}>
                <li className='nav-listItem'>
                    <a className='nav-listLink' href="/" >About </a>
                </li>
                <li className='nav-listItem'>
                    <a className='nav-listLink' href="/about" >Contact </a>
                </li>
                <li className='nav-listItem'>
                    <a className='nav-listLink' href="/profilePage" >Profile </a>
                </li>
                <form id='nav-searchForm'>
                    <input id='nav-searchInput' type="text" placeholder="Search.." name="search" />
                    <button id='nav-searchButton' type="submit"><CiSearch /></button>
                </form>
                <div id='nav-rightSideWrapper'> 
                    <li className='nav-listItem dropdown'>
                        <a href="#" className='dropbtn'>Categories</a>
                        <div className='dropdown-content'>
                            <a href="/stocks">Stocks</a>
                            <a href="/post">Post</a>
                            <button id='nav-LogOutButton' onClick={calllogOut}>Log Out</button>
                        </div>
                    </li>
                    <div id='nav-Logo'>
                    </div>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;