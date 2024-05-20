import React, { useState } from "react";
import { Link } from "react-router-dom";
import Home from "./HomeV2.jsx";
import profile_icon from "../../Components/Assets/profile-picture.png";

export default function ProfileV2() {
  const [userName, setUserName] = useState("-"); // Example user name, replace with dynamic data
  const [userEmail, setUserEmail] = useState("-"); // Example user email, replace with dynamic data

  return (
    <div className="w-full-padding">
      <div>
        <div className="profile-section">
          <img src={profile_icon} alt="" className="profile-icon" />
          <h2>User Profile</h2>

          <div className="profile-item">
            <label>
              User Name: <div>{userName}</div>
            </label>
          </div>

          <div className="profile-item">
            <label>
              User Email:<div>{userEmail}</div>
            </label>
          </div>
          <div className="profile-item">
            <label>
              Coordinator:<div>-</div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
