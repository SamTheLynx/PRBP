import React from 'react';
import { Link } from 'react-router-dom';
import './option.css'

const OptionPage = () => {
  return (
    <div className="option">
      <h1 style={{paddingBottom:'50px'}}> Please choose an option:</h1>
      <Link to="/admin-login">
        <button>Login as Admin</button>
      </Link>
      <Link to="/subadmin-login">
        <button>Login as Sub-Admin</button>
      </Link>
      <Link to="/user-login">
        <button>Login as Regular User</button>
      </Link>
    </div>
  );
};

export default OptionPage;