import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './UserCertificateList.css';
import CertificateItem from './CertificateItem';

export default function UserCertificateList() {
  const [certs, setCerts] = useState([]);

  // Retrieve CNIC from Redux store
  const userCnic = useSelector((state) => state.user.cnic);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/certificates/${userCnic}`);
        setCerts(response.data); // Assuming the backend returns an array of certificates
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    // Fetch certificates if CNIC is available
    if (userCnic) {
      fetchCertificates();
    }
  }, [userCnic]);

  const cancelBtn = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/cancel/${id}`); // Optional API to cancel a form if needed
      console.log("return in cancelbtn: ", response.data.message);

      setCerts((prevCerts) =>
        prevCerts.filter((cert) => cert._id !== id)
      );
    } catch (error) {
      console.error('Error canceling form:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="list-container">
        <div className="title-container">
          <p>ID</p>
          <p>Business Name</p>
          <p>Business Address</p>
          <p>Progress</p>
        </div>
        {certs
          .filter((cert) => cert.status < 8)
          .map((cert) => (
            <CertificateItem
                key={cert.id} // Ensure this key is unique for each item
                id={cert.formGId}
                name={cert.RestaurantName}
                dos={cert.RestaurantAddress}
                progress={cert.status === 7 ? 'Completed' : 'Pending'}
                clicked={()=>cancelBtn(cert._id)}   //{cert.status < 7 ? cancelBtn : undefined}
                hide={cert.hide}
            />
            ))}
      </div>
    </div>
  );
}
