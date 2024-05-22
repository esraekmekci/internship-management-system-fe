import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyHome from'./CompanyHomeV2.jsx';
import profile_icon from '../../Components/Assets/profile-picture.png'
import { GetWithAuth } from '../../Services/HttpService.js';


function CompanyProfileV2() {
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
        <div className='w-full-padding'>
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
    );
  }
  
export default CompanyProfileV2;
