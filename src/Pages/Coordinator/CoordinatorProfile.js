import React, { useState, useEffect } from 'react';
import './CoordinatorProfile.css';
import CoordinatorHome from './CoordinatorHome';
import profile_icon from '../../Components/Assets/profile-picture.png'
import { GetWithAuth } from "../../Services/HttpService.js"; 



function CoordinatorProfile() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const response = await GetWithAuth("/coordinator/token/" + localStorage.getItem("tokenKey"));
          const result = await response.json();
          setCurrentUser(result);
        } catch (error) {
          console.log(error);
          console.log("User not found");
        }
      };
  
      fetchProfileData();
    }, []);

    return(
        <CoordinatorHome>
            <div className="announcement-section" style={{marginTop:'60px'}}>
                <div className="profile-section">
                    <img src={profile_icon} alt="Profile Icon" className="profile-icon" />
                    <h2>Coordinator Profile</h2>
                    
                    <div className="profile-item">
                        <label><b>Coordinator Name:</b> {currentUser.name}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Coordinator Email:</b> {currentUser.email}</label>
                    </div>
                </div>
            </div>
        </CoordinatorHome>
    );
}

export default CoordinatorProfile;