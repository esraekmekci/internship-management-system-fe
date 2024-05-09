import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from'./Home.js';
import profile_icon from '../Components/Assets/profile-picture.png'

function Profile() {
  const [userName, setUserName] = useState('-'); // Example user name, replace with dynamic data
  const [userEmail, setUserEmail] = useState('-'); // Example user email, replace with dynamic data

  return (
    <Home>
      <div className="announcement-section" style={{marginTop:'60px'}}>
        <div className="profile-section">
            <img src={profile_icon} alt="" className="profile-icon" />
            <h2>User Profile</h2>
            
            <div className="profile-item">
                <label>User Name: <div>{userName}</div></label>
            </div>
            
            <div className="profile-item">
                <label>User Email:<div>{userEmail}</div></label>
            </div>
            <div className="profile-item">
                <label>Coordinator:<div>-</div></label>
            </div>
        
        </div>
      </div>
    </Home>
  );
}

export default Profile;
