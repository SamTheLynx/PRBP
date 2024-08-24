import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ManageSubAdmin.css";
import { useNavigate } from "react-router-dom";

function ManageSubAdmin() {
  const navigate = useNavigate();

  const handleCreateSubAdmin = () => {
    navigate("/subadmin-signup");
  };
  const handleviewSubAdmin = () => {
    navigate("/viewSubAdmins");
  };

  return (
    <div className="icon-buttons">
      <div className="ManageSubAdmin-first">
        <div className="ManageSubAdmin-first-div1">
          <FontAwesomeIcon className="fa-icon-color" size="4x" icon={faUser} />
        </div>
        <button
          onClick={handleCreateSubAdmin}
          className="icon-button"
        >
          Create Sub-Admin
        </button>
      </div>

      <div className="ManageSubAdmin-first">
        <div className="ManageSubAdmin-first-div1">
          <FontAwesomeIcon className="fa-icon-color" size="4x" icon={faEye} />
        </div>
       <button onClick={handleviewSubAdmin} className="icon-button">View Sub-Admin</button>
      </div>
    </div>
  );
}

export default ManageSubAdmin;
