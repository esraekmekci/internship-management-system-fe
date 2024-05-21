import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Home from'./Home.js';
import profile_icon from '../Components/Assets/profile-picture.png'
import { GetWithAuth } from "../Services/HttpService.js";

function Profile() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await GetWithAuth("/student/token/" + localStorage.getItem("tokenKey"));
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
    <Home>
            <div className="announcement-section" style={{marginTop:'60px'}}>
                <div className="profile-section">
                    <img src={profile_icon} alt="Profile Icon" className="profile-icon" />
                    <h2>Student Profile</h2>
                    
                    <div className="profile-item">
                        <label><b>Student Name:</b> {currentUser.name}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Student ID:</b> {currentUser.studentID}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Student Nationality:</b> {currentUser.nationality}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Student Email:</b> {currentUser.email}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Student Grade:</b> {currentUser.grade}</label>
                    </div>
                </div>
            </div>
    </Home>
  );
}

export default Profile;
