import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faList, faUserPlus, faUserTimes, faChartBar } from "@fortawesome/free-solid-svg-icons";
import "./AdminSidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="profile-section">
        <h2>Admin Name</h2>
        <p>(Role)</p>
      </div>
      <nav className="nav-links">
        <button onClick={() => handleNavigation('/dashboard')} className="nav-button">
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span>Dashboard</span>
        </button>
        <button onClick={() => handleNavigation('/viewSubAdmins')} className="nav-button">
          <FontAwesomeIcon icon={faList} />
          <span>View Sub-Admin Lists</span>
        </button>
        <button onClick={() => handleNavigation('/subadmin-signup')} className="nav-button">
          <FontAwesomeIcon icon={faUserPlus} />
          <span>Create Sub-Admin</span>
        </button>
        <button onClick={() => handleNavigation('/deleteSubAdmin')} className="nav-button">
          <FontAwesomeIcon icon={faUserTimes} />
          <span>Delete Sub-Admin</span>
        </button>
        <button onClick={() => handleNavigation('/subAdmin')} className="nav-button">
          <FontAwesomeIcon icon={faChartBar} />
          <span>Applications</span>
        </button>
        <button onClick={() => handleNavigation('/statistic')} className="nav-button">
          <FontAwesomeIcon icon={faChartBar} />
          <span>Stats</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
