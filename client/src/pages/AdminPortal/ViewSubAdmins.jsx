import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewSubAdmins.css";

function ViewSubAdmins() {
  const [subAdmins, setSubAdmins] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getSubadminsList")
      .then((response) => {
        setSubAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching SubAdmins:", error);
      });
  }, []);

  const handleDelete = (subAdminId) => {
    console.log('handleDelete called')
    axios
      .delete(`http://localhost:5000/subadmin/${subAdminId}`)
      .then((response) => {
        console.log('response handleDelete called')
        setSubAdmins(subAdmins.filter((subAdmin) => subAdmin._id !== subAdminId));
      })
      .catch((error) => {
        console.error("Error deleting SubAdmin: Frontend", error);
      });
  };


  return (
<div className="subAdmin-main">
  <h1 className="viewSubAdmin-h1">SubAdmin List</h1>
  <table className="subAdmin-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>CNIC</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {subAdmins.map((subAdmin, index) => (
        <tr key={subAdmin._id}>
          <td>{index + 1}</td>
          <td>{subAdmin.fname} {subAdmin.lname}</td>
          <td>{subAdmin.email}</td>
          <td>{subAdmin.cnic}</td>
          <td>
            <button
              onClick={() => handleDelete(subAdmin._id)}
              className="delete-button"
            >
              Delete Sub-Admin
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default ViewSubAdmins;
