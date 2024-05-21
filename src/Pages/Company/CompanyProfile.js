import React, { useState, useEffect } from 'react';
import CompanyHome from './CompanyHome';
import profile_icon from '../../Components/Assets/profile-picture.png';
import { GetWithAuth } from "../../Services/HttpService.js"; 

function CompanyProfile() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await GetWithAuth("/company/token/" + localStorage.getItem("tokenKey"));
        const result = await response.json();
        setCurrentUser(result);
      } catch (error) {
        console.log(error);
        console.log("User not found");
      }
    };

    fetchProfileData();
  }, []);

  return (
    <CompanyHome>
      <div className="announcement-section" style={{ marginTop: '60px' }}>
        <div className="profile-section">
          <img src={profile_icon} alt="Profile Icon" className="profile-icon" />
          <h2>Company Profile</h2>
          <div className="profile-item">
            <label><b>Company Name:</b> {currentUser.companyName}</label>
          </div>
          <br />
          <div className="profile-item">
            <label><b>Company Email:</b> {currentUser.email}</label>
          </div>
          <br />
          <div className="profile-item">
            <label><b>Company Representative Name:</b> {currentUser.name}</label>
          </div>
          <br />
          <div className="profile-item">
            <label><b>Company Address:</b> {currentUser.companyAddress}</label>
          </div>
          <br />
          <div className="profile-item">
            <label><b>Foundation Year:</b> {currentUser.foundationYear}</label>
          </div>
          <br />
          <div className="profile-item">
            <label><b>Employee Size:</b> {currentUser.employeeSize}</label>
          </div>
        </div>
      </div>
    </CompanyHome>
  );
}

export default CompanyProfile;
