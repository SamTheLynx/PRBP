import React, { useState } from "react";
import "./Navbar.css";
import logo from "./assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUsers } from "./store/slices/UserSlice";

const Navbar = () => {
  const ReduxUser=useSelector((state)=>{
    return state.user;
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('state');
    dispatch(logoutUsers());
    navigate('/'); 
    window.location.reload();
  };

  return (
    <div className="navbar-container">
      <div className="topbar">
        <div className="first-div">
          <img src={logo} alt="logo" />
          <Link to="/" className="no-underline">
            <h1>PRBRP</h1>
            <h3>Punjab Restaurant Business Registration Portal</h3>
          </Link>
        </div>

        <div className="second-div">
        {!ReduxUser.loggedIn ? (
          <div className="log-sign-options">
            <Link className="no-underline" to="/user-login">
              <p className="p">Login</p>
            </Link>
            <div className="VerticalLine"></div>
            <Link className="no-underline" to="/signup">
              <p className="p">Sign up</p>
            </Link>
          </div>
        ) : (
          <>
            {/* {ReduxAdmin.loggedIn || ReduxSubadmin.loggedIn  */}
            {ReduxUser.loggedIn && (ReduxUser.designation === 'subadmin' || ReduxUser.designation === 'admin') ? (
              <div>
                  <p className="p" onClick={logout}>Logout</p>
              </div>
            ) : (
              <div>
                <Link className="no-underline log-sign-options" to="/account">
                  <p className="p">{ReduxUser.fname + " " + ReduxUser.lname}</p>
                  <FontAwesomeIcon size="2x" color="#3C4E6F" icon={faUser} />
                </Link>
              </div>
            )}
          </>
        )}

        </div>
      </div>

      <nav className="navbar">
        <ul>
          {(!ReduxUser.loggedIn || (ReduxUser.loggedIn && ReduxUser.designation === 'businessOwner')) &&(<ul>
            <Link
              className="no-underline" to={ReduxUser.loggedIn ? "/cnic" : "/user-login"} >
              <li>Apply for Registration</li>
            </Link>

            <Link
              className="no-underline"
              to={ReduxUser.loggedIn ? "/tracking" : "/user-login"}
            >
              <li>Tracking</li>
            </Link>
            <Link className="no-underline" to="/about">
              <li>About Us</li>
            </Link>
            <Link className="no-underline" to="/procedure">
              <li>Procedure</li>
            </Link>
          </ul>)}
          {ReduxUser.loggedIn && ReduxUser.designation === 'admin' && (
            <Link className="no-underline" to="/admin">
              <li style={{fontSize:"20px",fontWeight:"bold"}}>Admin   Portal</li>
            </Link>
          )}
          {ReduxUser.loggedIn && ReduxUser.designation === 'subadmin' && (
            <Link className="no-underline" to="/subAdmin">
              <li style={{fontSize:"20px",fontWeight:"bold"}}>Sub-Admin Portal</li>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
