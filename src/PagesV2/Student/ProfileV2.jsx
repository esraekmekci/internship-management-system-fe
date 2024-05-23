import React, { useState } from "react";
import profile_icon from "../../Components/Assets/profile-picture.png";
import { useUser } from '../../Components//UserContext';

export default function ProfileV2() {
  const { user } = useUser();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Add password change logic here
    // Verify current password, check newPassword and confirmNewPassword match, then update
    console.log("Password change requested.");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full-padding">
      <div>
        <div className="profile-section">
          <img src={profile_icon} alt="" className="profile-icon" />
          <h2>Student Profile</h2>

          <div className="profile-item">
                        <label><b>Student Name:</b> {user.name}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Student ID:</b> {user.studentID}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Student Nationality:</b> {user.nationality}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Student Email:</b> {user.email}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Student Grade:</b> {user.grade}</label>
                    </div>
          <br/><br/>
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
        </div>
      </div>
    </div>
  );
}
