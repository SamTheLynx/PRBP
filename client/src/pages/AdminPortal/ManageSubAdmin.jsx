import React from "react";
import "./ManageSubAdmin.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { useNavigate } from "react-router-dom";
import Sidebar from "./AdminSidebar";
ChartJS.register(ArcElement, Tooltip, Legend);

function ManageSubAdmin() {
  const data = {
    labels: [
      "Total Applications",
      "New Applications",
      "In-process Applications",
      "Pending Applications",
      "Delayed Application"
    ],
    datasets: [
      {
        label: "# of Applications",
        data: [150, 30, 45, 60,15],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(100, 10, 132, 0.6)",

        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(100, 10, 132, 1)",

        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  const navigate = useNavigate();

  const handleViewCardDetails = (type) => {
    navigate(`/${type}`);
  };

  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <div className="manage-subadmin-container">
          <div className="cards-container">
            <div className="card">
              <h3>Total Applications</h3>
              <p>150</p>
              <button
                onClick={() => handleViewCardDetails("subAdmin")}
                className="card-view-button"
              >
                View
              </button>
            </div>
            <div className="card">
              <h3>New Applications</h3>
              <p>30</p>
              <button
                onClick={() => handleViewCardDetails("subAdmin")}
                className="card-view-button"
              >
                View
              </button>
            </div>
            <div className="card">
              <h3>In-process Applications</h3>
              <p>45</p>
              <button
                onClick={() => handleViewCardDetails("subAdmin")}
                className="card-view-button"
              >
                View
              </button>
            </div>
            <div className="card">
              <h3>Pending Applications</h3>
              <p>60</p>
              <button
                onClick={() => handleViewCardDetails("subAdmin")}
                className="card-view-button"
              >
                View
              </button>
            </div>
            <div className="card">
              <h3>Delayed Applications</h3>
              <p>15</p>
              <button
                onClick={() => handleViewCardDetails("pending-applications")}
                className="card-view-button"
              >
                View
              </button>
            </div>
          </div>
          <div className="pie-chart">
          <div style={{ width: "40%", margin: "auto" }}>
            <h2>Application Statistics</h2>
            <Pie data={data} options={options} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageSubAdmin;
