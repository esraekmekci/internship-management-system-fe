import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyHome from'./CompanyHomeV2.jsx';
import profile_icon from '../../Components/Assets/profile-picture.png'

function CompanyProfileV2() {
  const [userName, setUserName] = useState('-'); // Example user name, replace with dynamic data
  const [userEmail, setUserEmail] = useState('-'); // Example user email, replace with dynamic data

  return (
    <CompanyHome>
      <div className="announcement-section" style={{marginTop:'60px'}}>
        <div className="profile-section">
            <img src={profile_icon} alt="" className="profile-icon" />
            <h2>Company Profile</h2>
            
            <div className="profile-item">
                <label>Company Name: <div>{userName}</div></label>
            </div>
            <div className="profile-item">
                <label>Company Email:<div>-</div></label>
            </div>
            
            <div className="profile-item">
                <label>Company Address:<div>{userEmail}</div></label>
            </div>
            <div className="profile-item">
                <label>Foundation Year:<div>-</div></label>
            </div>
            <div className="profile-item">
                <label>Employee Size:<div>{userEmail}</div></label>
            </div>
        
        </div>
      </div>
    </CompanyHome>
  );
}

export default CompanyProfileV2;
