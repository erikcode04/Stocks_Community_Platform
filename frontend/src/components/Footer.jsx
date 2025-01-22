import React from "react";
import "./componentStyles/footer.css";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


function Footer() {
    return (
        <div className="footer-container">
            <footer>
                <div className="footer-content">
                    <div className="social-icons">
                        <span className="icon-placeholder"> <FaGithub/> </span>
                        <span className="icon-placeholder"><FaFacebook/></span>
                        <span className="icon-placeholder"><FaInstagram/></span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;