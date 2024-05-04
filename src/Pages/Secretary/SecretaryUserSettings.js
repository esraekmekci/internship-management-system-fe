import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SecretaryUserSettings.css';
import iyte_icon from '../../Components/Assets/iyte-logo.png';
import user_icon from '../../Components/Assets/user.png';
import settings_icon from '../../Components/Assets/settings.png';
import internship_icon from '../../Components/Assets/internship.png';
import documents_icon from '../../Components/Assets/documents.png';
import admin_icon from '../../Components/Assets/shield.png';
import company_icon from '../../Components/Assets/company.png';

function SecretaryUserSettings() {
  const [showDropdown, setShowDropdown] = useState({
    btn1: false,
    btn1_1: false,
    btn1_2: false,
    btn2: false,
    btn2_1: false, 
    btn2_2: false,
    btn3: false,
    btn3_1: false, 
    btn3_2: false,
    btn4: false,
  });

  const [userName, setUserName] = useState('-'); // Example user name, replace with dynamic data
  const [userEmail, setUserEmail] = useState('-'); // Example user email, replace with dynamic data
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = (e) => {
      e.preventDefault();
      // Add password change logic here
      // Verify current password, check newPassword and confirmNewPassword match, then update
      console.log("Password change requested.");
  };

  const toggleDropdown = (btn) => {
    setShowDropdown((prev) => ({ ...prev, [btn]: !prev[btn] }));
  };

  return (
    <div className="SecretaryUserSettings-layout">
      <div className="top-bar">
        <img src={iyte_icon} alt="" className="iyte-logo" />
      </div>
      
      <div className="sidebar">
 

        {/* Button 1 */}
        <div
          className="sidebar-btn"
          onMouseEnter={() => toggleDropdown('btn1')}
          onMouseLeave={() => toggleDropdown('btn1')}
        >
          <img src={internship_icon} alt="Person" className="internship-icon" />
          Secretary Actions
          {showDropdown.btn1 && (
            <div className="dropdown-content">
              <Link to="/" className="link-button">Students</Link>
              <div
                className="nested-dropdown"
                onMouseEnter={() => toggleDropdown('btn1_1')}
                onMouseLeave={() => toggleDropdown('btn1_1')}
              >
              </div>

            </div>
          )}
        </div>

        {/* Button 3 */}
        <div
          className="sidebar-btn"
          onMouseEnter={() => toggleDropdown('btn3')}
          onMouseLeave={() => toggleDropdown('btn3')}
        >
          <img src={documents_icon} alt="Person" className="documents-icon" />
          General Documents
          {showDropdown.btn3 && (
            <div className="dropdown-content">
              <Link to="" className="link-button">User Guide</Link>

              <div
                className="nested-dropdown"
                onMouseEnter={() => toggleDropdown('btn3_2')}
                onMouseLeave={() => toggleDropdown('btn3_2')}
              >
                <a href="https://iyte.edu.tr" className="link-button" target="_blank" rel="noopener noreferrer">IZTECH Page</a>
                
              </div>
            </div>
          )}
        </div>
          {/* Button 4 */}
          <div
          className="sidebar-btn"
          onMouseEnter={() => toggleDropdown('btn4')}
          onMouseLeave={() => toggleDropdown('btn4')}
        >
          <img src={settings_icon} alt="Person" className="settings-icon" />
          General Settings
          {showDropdown.btn4 && (
            <div className="dropdown-content">
              <Link to="/sec_settings" className="link-button">User Settings</Link>
              <div
                className="nested-dropdown"
                onMouseEnter={() => toggleDropdown('btn4_1')}
                onMouseLeave={() => toggleDropdown('btn4_1')}
              >
                <a href="https://ubysdestek.iyte.edu.tr" className="link-button" target="_blank" rel="noopener noreferrer">Help</a>
                
              </div>
              <div
                className="nested-dropdown"
                onMouseEnter={() => toggleDropdown('btn4_2')}
                onMouseLeave={() => toggleDropdown('btn4_2')}
              >
                <Link to="/log_out" className="link-button">Log out</Link>
                
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="settings-section">
            <h2>User Settings</h2>
            
            <div className="setting-item">
                <label>User Name: <div>{userName}</div></label>
               
            </div>
            
            <div className="setting-item">
                <label>User Email:<div>{userEmail}</div></label>
                
            </div>

            <form onSubmit={handleChangePassword}>
                <div className="setting-item">
                <label>Current Password:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                </div>
                <div className="setting-item">
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                </div>
                <div className="setting-item">
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                </div>
                <button type="submit">Change Password</button>
            </form>
            
            {/* Add more settings items here */}
          </div>          

    </div>
  );
}

export default SecretaryUserSettings;
