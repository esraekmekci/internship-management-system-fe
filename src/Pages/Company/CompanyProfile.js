import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyHome from './CompanyHome';
import profile_icon from '../../Components/Assets/profile-picture.png';
import { GetWithAuth } from "../../Services/HttpService.js"; 

function CompanyProfile() {
  const [currentUser, setCurrentUser] = useState({
    companyName: '-',
    email: '-',
    address: '-',
    foundationYear: '-',
    employeeSize: '-'
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await GetWithAuth("/company/profile/" + localStorage.getItem("tokenKey"));
        if (response.ok) {
          const data = await response.json();
          setCurrentUser({
            companyName: data.companyName,
            email: data.email,
            address: data.address,
            foundationYear: data.foundationYear,
            employeeSize: data.employeeSize
          });
        } else {
          throw new Error('Failed to fetch company profile');
        }
      } catch (error) {
        console.error('Error fetching company profile:', error);
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
            <label>Company Name: <div>{currentUser.companyName}</div></label>
          </div>
          <div className="profile-item">
            <label>Company Email:<div>{currentUser.email}</div></label>
          </div>
          <div className="profile-item">
            <label>Company Address:<div>{currentUser.address}</div></label>
          </div>
          <div className="profile-item">
            <label>Foundation Year:<div>{currentUser.foundationYear}</div></label>
          </div>
          <div className="profile-item">
            <label>Employee Size:<div>{currentUser.employeeSize}</div></label>
          </div>
        </div>
      </div>
    </CompanyHome>
  );
}

export default CompanyProfile;
