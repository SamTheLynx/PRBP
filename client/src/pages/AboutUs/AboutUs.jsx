import React from 'react';
import './AboutUs.css'
import {Link} from 'react-router-dom'
import imageSrc from "../../assets/about.jpg"; 

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <div className="content">
        <div className="image">
          <img src={imageSrc} alt="About Us" />
        </div>
        <div className="text">
          
            <div className='welcome'>Welcome! </div><br></br>
            <p>
            We're dedicated to relieving investors and business owners of unnecessary efforts, allowing them to prioritize delivering quality services instead of being drained by inefficient procedures. Our aim is to simplify the cumbersome registration process for restaurant businesses by digitizing the entire procedure.
          </p>
          <p>
            For any inquiries or assistance, please don't hesitate to <Link to="/contact">contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
