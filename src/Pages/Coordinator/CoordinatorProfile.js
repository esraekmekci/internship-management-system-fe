import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CoordinatorProfile.css';
import CoordinatorHome from './CoordinatorHome';
import profile_icon from '../../Components/Assets/profile-picture.png'


function CoordinatorProfile() {

    const [userName, setUserName] = useState('-'); // Example user name, replace with dynamic data
    const [userEmail, setUserEmail] = useState('-'); // Example user email, replace with dynamic data

    return(
        <CoordinatorHome>
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
                </div>
            </div>
        </CoordinatorHome>
    );
}

export default CoordinatorProfile;