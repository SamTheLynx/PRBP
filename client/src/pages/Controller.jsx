import React, { useState } from "react";
import "./AdminPortal/ManageSubAdmin.css";
import TrackFormStatus from "./Tracking/Tracking";

// FormItem component
const FormItem = ({ form, onAccept, onReject }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="form-item">
      <p>ID: {form.id}</p>
      <p>Name: {form.name}</p>
      <p>Email: {form.email}</p>

      {!showMore && (
        <button className="btn" onClick={toggleShowMore}>
          View Full Form
        </button>
      )}
      {showMore && (
        <div>
          <p>Father's Name: {form.fatherName}</p>
          <p>Address: {form.address}</p>
          <p>Phone Number: {form.phoneNumber}</p>
          <p>Date of Birth: {form.dateOfBirth}</p>

          <button className="btn" onClick={toggleShowMore}>
            Less
          </button>
        </div>
      )}
      <div className="button-row">
        <button className="btn" onClick={() => onAccept(form.id)}>
          Accept
        </button>
        <button className="btn" onClick={() => onReject(form.id)}>
          Reject
        </button>
      </div>
    </div>
  );
};

// FormList component
const FormList = ({ forms, onAccept, onReject, title }) => {
  return (
    <div className="form-list">
      <h2>{title}</h2>
      {forms.map((form) => (
        <FormItem
          key={form.id}
          form={form}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
};

// AcceptedForms and RejectedForms components
const AcceptedForms = ({ forms }) => {
  return (
    <div className="accepted-forms">
      <h2>Accepted Forms</h2>
      {forms.length === 0 ? (
        <p>No forms accepted yet.</p>
      ) : (
        forms.map((form) => (
          <div key={form.id} className="form-item">
            <p>Name: {form.name}</p>
            <p>Father's Name: {form.fatherName}</p>
            <p>Email: {form.email}</p>
            <p>Address: {form.address}</p>
            <p>Phone Number: {form.phoneNumber}</p>
            <p>Date of Birth: {form.dateOfBirth}</p>
          </div>
        ))
      )}
    </div>
  );
};

const RejectedForms = ({ forms }) => {
  return (
    <div className="rejected-forms">
      <h2>Rejected Forms</h2>
      {forms.length === 0 ? (
        <p>No forms rejected yet.</p>
      ) : (
        forms.map((form) => (
          <div key={form.id} className="form-item">
            <p>Name: {form.name}</p>
            <p>Father's Name: {form.fatherName}</p>
            <p>Email: {form.email}</p>
            <p>Address: {form.address}</p>
            <p>Phone Number: {form.phoneNumber}</p>
            <p>Date of Birth: {form.dateOfBirth}</p>
          </div>
        ))
      )}
    </div>
  );
};

// Controller component
const Controller = () => {
  const initialForms = [
    {
      id: 1,
      name: "HB1",
      email: "l201186@lhr.nu.edu.pk",
      fatherName: "f1",
      address: "123 Main St",
      phoneNumber: "555-123-4567",
      dateOfBirth: "01/01/1990",
      status: "pending",
    },
    {
      id: 2,
      name: "HB2",
      email: "hb2@example.com",
      fatherName: "f2",
      address: "456 Oak Ave",
      phoneNumber: "555-987-6543",
      dateOfBirth: "02/15/1985",
      status: "pending",
    },
    {
      id: 3,
      name: "HB3",
      email: "hb3@example.com",
      fatherName: "f3",
      address: "456 Oak Ave",
      phoneNumber: "555-987-6543",
      dateOfBirth: "02/15/1985",
      status: "pending",
    },
  ];

  const [pendingForms, setPendingForms] = useState(initialForms);
  const [acceptedForms, setAcceptedForms] = useState([]);
  const [rejectedForms, setRejectedForms] = useState([]);
  const [showAcceptedForms, setShowAcceptedForms] = useState(false);
  const [showRejectedForms, setShowRejectedForms] = useState(false);
  const [showPendingForms, setShowPendingForms] = useState(false);

  const handleAccept = (id) => {
    const form = pendingForms.find((form) => form.id === id);
    setPendingForms(pendingForms.filter((form) => form.id !== id));
    setAcceptedForms([...acceptedForms, { ...form, status: "accepted" }]);
  };

  const handleReject = (id) => {
    const form = pendingForms.find((form) => form.id === id);
    setPendingForms(pendingForms.filter((form) => form.id !== id));
    setRejectedForms([...rejectedForms, { ...form, status: "rejected" }]);
  };

  const handlePendingClick = () => {
    if (pendingForms.length === 0) {
      alert("No pending applications.");
    } else {
      setShowPendingForms(!showPendingForms);
    }
  };

 
  return (
    <div>
      <div className="admin-portal">
        <h1>Admin Portal</h1>
        <div className="main">
          <div className="first">
            <div>
              <h1 className="h1">Subadmins</h1>
            </div>
            <div className="first-div1">
              <p className="p">Pending Applications</p>
            </div>
            <div>
              <button className="button" onClick={handlePendingClick}>
                {showPendingForms ? "Hide Pending Applications" : "Open Pending Applications"}
              </button>
            </div>
          </div>
        </div>
        {showPendingForms && (
          <FormList
            forms={pendingForms}
            onAccept={handleAccept}
            onReject={handleReject}
            title="Pending Forms"
          />
        )}

        {showPendingForms && (
          <div className="button-container">
            <div>
              <button
                className="btn"
                onClick={() => setShowAcceptedForms(!showAcceptedForms)}
              >
                {showAcceptedForms ? "Hide" : "Show"} Accepted Forms
              </button>
            </div>
            <div>
              <button
                className="btn"
                onClick={() => setShowRejectedForms(!showRejectedForms)}
              >
                {showRejectedForms ? "Hide" : "Show"} Rejected Forms
              </button>
            </div>
          </div>
        )}
        {showAcceptedForms && <AcceptedForms forms={acceptedForms} />}
        {showRejectedForms && <RejectedForms forms={rejectedForms} />}
      </div>

      <div>
      <TrackFormStatus forms={[...pendingForms, ...acceptedForms, ...rejectedForms]} />

      </div>
    </div>
  );
};

export default Controller;
