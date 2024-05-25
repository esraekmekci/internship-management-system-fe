import React, { useEffect, useState } from 'react';
import profile_icon from '../../Components/Assets/profile-picture.png'
import { useUser } from '../../Components//UserContext';
import Loading from '../../Pages/LoadingPage';

function CompanyProfileV2() {
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
    return <Loading isLoading={true}/>;
  }
  
    return (
        <div className='w-full-padding'>
          <div className="profile-section">
            <img src={profile_icon} alt="Profile Icon" className="profile-icon" />
            <h2>Company Profile</h2>
            <div className="profile-item">
              <label><b>Company Name:</b> {user.companyName}</label>
            </div>
            <br />
            <div className="profile-item">
              <label><b>Company Email:</b> {user.email}</label>
            </div>
            <br />
            <div className="profile-item">
              <label><b>Company Representative Name:</b> {user.name}</label>
            </div>
            <br />
            <div className="profile-item">
              <label><b>Company Address:</b> {user.companyAddress}</label>
            </div>
            <br />
            <div className="profile-item">
              <label><b>Foundation Year:</b> {user.foundationYear}</label>
            </div>
            <br />
            <div className="profile-item">
              <label><b>Employee Size:</b> {user.employeeSize}</label>
            </div>

            <br /><br />

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
    );
  }
  
export default CompanyProfileV2;
