import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetWithAuth } from "../../Services/HttpService";
import './CoordinatorHome.css';
import iyte_icon from '../../Components/Assets/iyte-logo.png';
import user_icon from '../../Components/Assets/user.png';
import settings_icon from '../../Components/Assets/settings.png';
import internship_icon from '../../Components/Assets/internship.png';
import documents_icon from '../../Components/Assets/documents.png';
import admin_icon from '../../Components/Assets/shield.png';
import company_icon from '../../Components/Assets/company.png';

import student_icon from '../../Components/Assets/studentbook.png';
import grade_icon from '../../Components/Assets/grades.png';
import announcement_icon from '../../Components/Assets/announcements.png';

const CoordinatorHome =({children}) => {
    var [currentUser, setCurrentUser] = useState({});
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
  
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await GetWithAuth("/students/token/" + localStorage.getItem("tokenKey"));
              const result = await response.json();
              console.log(result);
              setCurrentUser(result);
              console.log(currentUser.name);
          } catch (error) {
              console.log(error);
              console.log("User not found");
          }
      };
  
      const timeout = setTimeout(() => {
          fetchData();
      }, 100); // 2 saniye bekleme süresi
  
      return () => clearTimeout(timeout); // useEffect'in temizleme fonksiyonu, bileşen kaldırıldığında zamanlayıcıyı temizler
  
  }, []);
  
    return (
      <div className="coordinatorhome-layout">
        <div className="top-bar">
          <img src={iyte_icon} alt="" className="iyte-logo" />
        </div>
        
        <div className="sidebar">
          <div className="info-blocks">
            <div className="internship-info">
              <img src={admin_icon} alt="" className="admin-icon" />
              <h4>{currentUser.role}</h4>
              <div>Name: {currentUser.name}</div>
            </div>
          </div>
  
          {/* Button 1 */}
          <div
            className="sidebar-btn"
            onClick={() => toggleDropdown('btn1')}
            //onMouseLeave={() => toggleDropdown('btn1')}
          >
            <img src={student_icon} alt="" className="student-icon" />
            <Link to="/coor_students" className="" style={{textDecoration:"none", color:"black"}}>Students</Link>
            

          </div>
  
          {/* Button 2 */}
          <div
            className="sidebar-btn"
            onClick={() => toggleDropdown('btn2')}
            //onMouseLeave={() => toggleDropdown('btn2')}
          >
            <img src={user_icon} alt="" className="user-icon" />
            User Actions
            {showDropdown.btn2 && (
              <div className="dropdown-content">
                <Link to="/coor_profile" className="link-button">Profile</Link>
                <div
                  className="nested-dropdown"
                  onClick={() => toggleDropdown('btn2_1')}
                  //onMouseLeave={() => toggleDropdown('btn2_1')}
                >
                  <a href="https://ubys.iyte.edu.tr" className="link-button" target="_blank" rel="noopener noreferrer">UBYS</a>
                  
                </div>
  
              </div>
            )}
          </div>
          {/* Button 3 */}
          <div className="sidebar-btn">
            <img src={announcement_icon} alt="" className="announcement-icon" />
            <Link to="/coor_announcements"  style={{textDecoration:"none", color:"black"}}>Announcements</Link>
          </div>
          
          
            {/* Button 4 */}
            <div
            className="sidebar-btn"
            onClick={() => toggleDropdown('btn4')}
            //onMouseLeave={() => toggleDropdown('btn4')}
          >
            <img src={settings_icon} alt="" className="settings-icon" />
            General Settings
            {showDropdown.btn4 && (
              <div className="dropdown-content">
                <Link to="/coor_settings" className="link-button">User Settings</Link>
                <div
                  className="nested-dropdown"
                  onClick={() => toggleDropdown('btn4_1')}
                  //onMouseLeave={() => toggleDropdown('btn4_1')}
                >
                  <a href="https://ubysdestek.iyte.edu.tr" className="link-button" target="_blank" rel="noopener noreferrer">Help</a>
                  
                </div>
                <div
                  className="nested-dropdown"
                  onClick={() => toggleDropdown('btn4_2')}
                  //onMouseLeave={() => toggleDropdown('btn4_2')}
                >
                  <Link to="/log_out" className="link-button">Log out</Link>
                  
                </div>
              </div>
            )}
          </div>
  
  
          <div className="sidebar-btn">
            <img src={grade_icon} alt="" className="grade-icon" />
                <Link to="/coor_grades"  style={{textDecoration:"none", color:"black"}} >Grades</Link>
          </div>
  
          <div className="sidebar-btn">
            <img src={documents_icon} alt="" className="documents-icon" />         
                <Link to="/guidelines"  style={{textDecoration:"none", color:"black"}} >Guidelines</Link>             
          </div>
  
  
  
  
  
  
  
  
  
  
  
        </div>
        <main>{children}</main>
      </div>
  
    );
  }
  
  export default CoordinatorHome;