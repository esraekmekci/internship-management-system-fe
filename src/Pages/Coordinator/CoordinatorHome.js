import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetWithAuth } from "../../Services/HttpService";
import './CoordinatorHome.css';
import iyte_icon from '../../Components/Assets/iyte-logo.png';
import user_icon from '../../Components/Assets/user.png';
import documents_icon from '../../Components/Assets/documents.png';
import admin_icon from '../../Components/Assets/shield.png';
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
      userbtn:false,
      userbtn_1:false,
      userbtn_2:false,
      userbtn_3:false,
      userbtn_4:false,
      userbtn_5:false,
      homebtn: false,
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
  
    },);
  
    return (
      <div className="coordinatorhome-layout">
      <div className="top-bar">
          <Link to="/coor_home" style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }}> 
              <img src={iyte_icon} alt="" className="iyte-logo" /><b>IZTECH IMS</b>
          </Link>
      
          <div className="top-bar-button" style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }} onClick={() => toggleDropdown('userbtn')}>
          <h4>{currentUser.name}</h4>
          <img src={user_icon} alt="User" className="user-icon" onClick={() => toggleDropdown('userbtn')} /> 
            </div>
          {showDropdown.userbtn && (
            <div className="dropdown-content"   style={{ position: 'absolute',right: '0', top: '50px',  width:'150px',marginLeft:'auto'}}>

              <Link to="/coor_profile" className="link-button">Profile</Link>
              
              <div className="nested-dropdown" onClick={() => toggleDropdown('userbtn_2')}>
                <a href="https://ubys.iyte.edu.tr" target="_blank" rel="noopener noreferrer" className="link-button">UBYS</a>
              </div>
              <div className="nested-dropdown" onClick={() => toggleDropdown('userbtn_3')} >
                <Link to="/coor_settings" className="link-button">User Settings</Link>   
              </div>
              <div className="nested-dropdown" onClick={() => toggleDropdown('userbtn_4')} >
                <a href="https://ubysdestek.iyte.edu.tr" className="link-button" target="_blank" rel="noopener noreferrer">Help</a>
              </div>
              <div className="nested-dropdown" onClick={() => toggleDropdown('userbtn_5')} >
                <Link to="/log_out" className="link-button">Log out</Link> 
              </div>
            </div>
          )}
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
  

          {/* Button 3 */}
          <div className="sidebar-btn">
            <img src={announcement_icon} alt="" className="announcement-icon" />
            <Link to="/coor_announcements"  style={{textDecoration:"none", color:"black"}}>Announcements</Link>
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