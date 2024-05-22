import React, { useState } from "react";
import { Link } from "react-router-dom";
import Home from "./HomeV2.jsx";
import settings_icon from "../../Components/Assets/settings.png";

export default function UserSettingsV2() {
  const [userName, setUserName] = useState("-"); // Example user name, replace with dynamic data
  const [userEmail, setUserEmail] = useState("-"); // Example user email, replace with dynamic data
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Add password change logic here
    // Verify current password, check newPassword and confirmNewPassword match, then update
    console.log("Password change requested.");
  };

  return (
    <div className="w-full-padding">
      <div>
        <h2>
          <img src={settings_icon} alt="Person" className="settings-icon" />{" "}
          User Settings
        </h2>

        <div className="setting-item">
          <label>
            User Name: <div>{userName}</div>
          </label>
        </div>

        <div className="setting-item">
          <label>
            User Email: <div>{userEmail}</div>
          </label>
        </div>

        <form onSubmit={handleChangePassword}>
          <div className="setting-item">
            <label>
              Current Password:{" "}
              <div>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>{" "}
            </label>
          </div>
          <br />
          <div className="setting-item">
            <label>
              New Password:{" "}
              <div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>{" "}
            </label>
          </div>
          <br />
          <div className="setting-item">
            <label>
              Confirm New Password:{" "}
              <div>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>{" "}
            </label>
          </div>
          <br />
          <button type="submit" style={{ marginTop: "15px" }} className="iyte-bg">
            Change Password
          </button>
        </form>

        {/* Add more settings items here */}
      </div>
    </div>
  );
}
