import React from "react";
import { Link } from "react-router-dom"; // Only import Link here
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import img1 from "../../assets/Home-img1.png";
import img2 from "../../assets/Home2.jpg";
import AdminLogin from "../AdminLogin";

function Home() {
  const ReduxUser = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header Section with Gradient Background */}
      <div 
        style={{
          background: 'linear-gradient(to right, #315396, #bab4f0)', // Customize colors as needed
        }} 
        className="text-white text-center py-12 text-2xl font-extrabold shadow-md"
      >
        APPLY FOR A RESTAURANT CERTIFICATION ONLINE
      </div>

      {/* First Section */}
      <div 
        style={{
          background: '#e0e7ff', // Light background color for the first section
        }} 
        className="flex flex-col md:flex-row p-8 items-center"
      >
        <div className="flex-1 mb-6 md:mb-0">
          <img 
            src={img1} 
            alt="Restaurant Certification" 
            className="max-w-xs h-auto rounded-lg shadow-lg  mx-auto" 
          />
        </div>
        <div className="flex-1">
          <p className="text-lg mb-6 text-gray-700">
            Now introducing an easier way to get your restaurant certified! 
            Put aside all the hassles of traveling far and spending excessive amounts of money 
            just so you can start your business. You can now put in your applications faster!
          </p>
          <div className="flex justify-center">
            <Link to={ReduxUser.loggedIn ? "/cnic" : "/loginOptions"}>
              <button className="bg-custom-blue  text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                APPLY NOW
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Second Section with a Different Background Color */}
      <div 
        style={{
          background: '#dbeafe', // Different light background color for the second section
        }} 
        className="flex flex-col md:flex-row p-8 items-center"
      >
        <div className="flex-1">
          <p className="text-lg mb-6 text-gray-700">
          Get your certificate renewed! 
          Keep your business compliant and up-to-date by renewing your certification easily and quickly. 
          With our streamlined online process, you can avoid lengthy paperwork and ensure your certification stays current, giving you peace of mind to focus on what you do best!
          </p>
          <div className="flex justify-center">
            <Link to={ReduxUser.loggedIn ? "/renewal" : "/loginOptions"}>
              <button className="bg-custom-blue  text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                Renew Certificate
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 mb-6 md:mb-0">
          <img 
            src={img2} 
            alt="Restaurant Certification" 
            className="max-w-xs h-auto rounded-lg shadow-lg mx-auto" 
          />
        </div>
      </div>

      <div className="mt-auto bg-gray-800 text-white py-4 text-center">
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default Home;
