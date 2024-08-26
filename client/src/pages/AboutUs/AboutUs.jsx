import React from 'react';
import { Link } from 'react-router-dom';
import imageSrc from "../../assets/about.jpg"; // Ensure the path is correct

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="w-full max-w-5xl p-6 md:p-12 flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-center md:text-left text-custom-blue animate__animated animate__fadeIn">About Us</h2>
          <div className="text-center md:text-left space-y-4">
            <div className="text-2xl font-semibold text-custom-blue animate__animated animate__bounceIn">Welcome!</div>
            <p className="text-gray-700">
              We're dedicated to relieving investors and business owners of unnecessary efforts, allowing them to prioritize delivering quality services instead of being drained by inefficient procedures. Our aim is to simplify the cumbersome registration process for restaurant businesses by digitizing the entire procedure.
            </p>
            <p className="text-gray-700">
              For any inquiries or assistance, please don't hesitate to <Link to="/contact" className="text-blue-600 hover:underline text-lg font-bold transition-colors duration-300 hover:text-blue-800">contact us</Link>.
            </p>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 flex justify-center">
          <img src={imageSrc} alt="About Us" className="w-full max-w-sm h-auto rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
