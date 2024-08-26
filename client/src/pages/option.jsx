import React from 'react';
import { Link } from 'react-router-dom';
import optionsImage from '../assets/options.jpg'; // Adjust path as needed

const OptionPage = () => {
  return (
    <div className=" flex items-center justify-center bg-gradient-to-r from-gray-200 to-blue-100 p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl bg-white">
        {/* Content Section */}
        <div className="text-center md:text-left md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-12 text-custom-blue">Please choose an option:</h1>
          <div className="flex flex-col gap-6 items-center md:items-start">
            <Link to="/admin-login" className="w-full">
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-gray-200 via-blue-100 to-blue-200">
                <h2 className="text-xl font-semibold mb-2 text-custom-blue">Login as Admin</h2>
                <p className='text-xs font-thin'>Access administrative features and manage the system.</p>
              </div>
            </Link>
            <Link to="/subadmin-login" className="w-full">
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-gray-200 via-blue-100 to-blue-200">
                <h2 className="text-xl font-semibold mb-2 text-custom-blue">Login as Sub-Admin</h2>
                <p className='text-xs font-thin'>Manage specific areas with limited administrative rights.</p>
              </div>
            </Link>
            <Link to="/user-login" className="w-full">
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-gray-200 via-blue-100 to-blue-200">
                <h2 className="text-xl font-semibold mb-2 text-custom-blue">Login as Regular User</h2>
                <p className='text-xs font-thin'>Access user-specific features and manage your account.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 p-8">
          <img src={optionsImage} alt="Options" className="w-full h-auto " />
        </div>
      </div>
    </div>
  );
};

export default OptionPage;



