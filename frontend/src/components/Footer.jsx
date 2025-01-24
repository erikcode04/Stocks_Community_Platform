import React, {useState} from "react";
import "./componentStyles/footer.css";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
 const [thisYear, setThisYear] = useState(new Date().getFullYear());    

    return (
        <div className="footer-container">
                <div className="footer-content">

                    <p className="footer-copyRightText">      Copy right @{thisYear}    </p>

                    <div className="social-icons">
                        <a href="https://github.com/erikcode04" className="icon-placeholder"> <FaGithub/> </a>
                        <a className="icon-placeholder"><FaFacebook/></a>
                        <a className="icon-placeholder"><FaInstagram/></a>
                    </div>
                </div>
        </div>
    )
}

export default Footer;