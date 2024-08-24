import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-main">
      <div>
        <ul>
          <Link className="footer-first-div" to="/submission">
            {" "}
            <li>Apply for Certificate</li>
          </Link>
          <Link className="footer-first-div" to="/contact">
            <li>Contact Us</li>
          </Link>
          <Link className="footer-first-div" to="/about">
            {" "}
            <li>About Us</li>{" "}
          </Link>
        </ul>
      </div>

      <div>
        <footer className="">
        <p>Contact us At:</p>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/PIDEIslamabad/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FontAwesomeIcon icon={faFacebook} style={{ color: "white" }} />
            </a>
            <a
              href="https://twitter.com/PIDEpk?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.instagram.com/pidepk/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </footer>
      </div>

      <div>
      <p>Address:</p>
      <p className="footer-text">PIDE Islamabad</p>
      </div>
    </div>
  );
};

export default Footer;
s