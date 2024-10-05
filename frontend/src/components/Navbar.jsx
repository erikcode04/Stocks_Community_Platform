import React from 'react';
import "./componentStyles/Navbar.css";

function Navbar() {
    return (
        <nav id='nav-container'>
        <ul id='nav-list'>
            <li className='nav-listItem'>
            <a href="/" >Home</a>
            </li>
            <li className='nav-listItem'>
            <a href="/about" >About</a>
            </li>
            <li className='nav-listItem'>
            <a href="/contact" >Contact</a>
            </li>
            <li className='nav-listItem'>
            <a href="/" >Home</a>
            </li>
            <li className='nav-listItem'>
            <a href="/about" >About</a>
            </li>
            <li className='nav-listItem'>
            <a href="/contact" >Contact</a>
            </li>
         
       
        </ul>
        </nav>
    );
    }

export default Navbar;