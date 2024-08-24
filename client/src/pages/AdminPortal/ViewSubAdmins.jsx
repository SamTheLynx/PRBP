import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewSubAdmins.css";

function ViewSubAdmins() {
  const [subAdmins, setSubAdmins] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/subadmins")
      .then((response) => {
        setSubAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching SubAdmins:", error);
      });
  }, []);

  const handleDelete = (subAdminId) => {
    axios
      .delete(`http://localhost:5000/api/subadmins/${subAdminId}`)
      .then((response) => {
        setSubAdmins(subAdmins.filter((subAdmin) => subAdmin._id !== subAdminId));
      })
      .catch((error) => {
        console.error("Error deleting SubAdmin: Frontend", error);
      });
  };


  return (
    <div>
      <h1 className="viewSubAdmin-h1">SubAdmin List</h1>
      <ul>
        {subAdmins.map((subAdmin, index) => (
          <li className="viewSubAdmin-li" key={subAdmin._id}>
            <strong></strong> {index + 1}
            <br />
            <strong>Name:</strong> {subAdmin.fname} {subAdmin.lname}
            <br />
            <strong>Email:</strong> {subAdmin.email}
            <br />
            <strong>CNIC:</strong> {subAdmin.cnic}
            <br />
            <button
              onClick={() => handleDelete(subAdmin._id)}
              className="delete-button"
            >
              Delete Sub-Admin
            </button>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewSubAdmins;
