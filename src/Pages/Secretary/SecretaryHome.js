import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SecretaryHome.css';
import iyte_icon from '../../Components/Assets/iyte-logo.png';
import user_icon from '../../Components/Assets/user.png';
import settings_icon from '../../Components/Assets/settings.png';
import internship_icon from '../../Components/Assets/internship.png';
import documents_icon from '../../Components/Assets/documents.png';
import admin_icon from '../../Components/Assets/shield.png';
import company_icon from '../../Components/Assets/company.png';

function SecretaryHome() {
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

  const toggleDropdown = (btn) => {
    setShowDropdown((prev) => ({ ...prev, [btn]: !prev[btn] }));
  };

  return (
    <div className="SecretaryHome-layout">
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

      <div className="document-section">
        <div className="new-title">New Documents</div>
        <div className="new-underline"></div>
        <div className="list-title">Documents List</div>
        <div className="list-underline"></div>
        <div className="content-title">Document Contents</div>
        <div className="content-underline"></div>
      </div>
    </div>
  );
}

export default SecretaryHome;
