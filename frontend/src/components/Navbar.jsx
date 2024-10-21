import React from 'react';
import Logo from "../assets/logo.png";
import { CiSearch } from "react-icons/ci";

import "./componentStyles/navbar.css";

function Navbar() {
    return (
        <nav id='nav-container'>
            <div id='nav-logoContainer'>
                <a id='nav-homeLink' href='/'> 
                    <h1 id='nav-homeLinkText'> Home </h1>
                </a>
            </div>
            <ul id='nav-list'>
                <li className='nav-listItem'>
                    <a className='nav-listLink' href="/" >Home</a>
                </li>
                <li className='nav-listItem'>
                    <a className='nav-listLink' href="/about" >About</a>
                </li>
                <li className='nav-listItem'>
                    <a className='nav-listLink' href="/contact" >Contact</a>
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
                        <a href="/physics">Physics</a>
                        <a href="/space">Space</a>
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