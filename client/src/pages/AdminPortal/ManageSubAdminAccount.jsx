import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageSubAdminAccount.css";

function ManageSubAdminAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSubAdmin, setCurrentSubAdmin] = useState(null);
  const [subAdmins, setSubAdmins] = useState([]);

  // Function to handle the edit button click
  const handleEdit = (subAdmin) => {
    setCurrentSubAdmin(subAdmin);
    setIsEditing(true);
  };

  // Fetch the list of sub-admins when the component mounts
  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getSubadminsList");
        setSubAdmins(response.data);
      } catch (error) {
        console.error("Error fetching SubAdmins:", error);
      }
    };

    fetchSubAdmins();
  }, []);

  // Function to handle form submission for updating sub-admin
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/updateSubAdmin/${currentSubAdmin._id}`, currentSubAdmin);
      if (response.status === 200) {
        alert('Sub-admin updated successfully!');
        // Update the local subAdmins state with the updated subAdmin data
        setSubAdmins((prevSubAdmins) =>
          prevSubAdmins.map((subAdmin) =>
            subAdmin._id === currentSubAdmin._id ? currentSubAdmin : subAdmin
          )
        );
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating sub-admin:', error);
      alert('Failed to update sub-admin');
    }
  };

  return (
    <div className="subAdmin-main">
      <h1 className="viewSubAdmin-h1">Manage Account Details</h1>
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
                  onClick={() => handleEdit(subAdmin)}
                  className="delete-button"
                >
                  Update Sub-Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && currentSubAdmin && (
        <div className="edit-form">
          <h2>Edit Sub-Admin</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              First Name:
              <input
                type="text"
                value={currentSubAdmin.fname}
                onChange={(e) =>
                  setCurrentSubAdmin({ ...currentSubAdmin, fname: e.target.value })
                }
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={currentSubAdmin.lname}
                onChange={(e) =>
                  setCurrentSubAdmin({ ...currentSubAdmin, lname: e.target.value })
                }
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={currentSubAdmin.email}
                onChange={(e) =>
                  setCurrentSubAdmin({ ...currentSubAdmin, email: e.target.value })
                }
                required
              />
            </label>
            <label>
              CNIC:
              <input
                type="text"
                value={currentSubAdmin.cnic}
                onChange={(e) =>
                  setCurrentSubAdmin({ ...currentSubAdmin, cnic: e.target.value })
                }
                required
              />
            </label>
            <button type="submit" className="submit-button">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManageSubAdminAccount;
