import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetWithAuth } from "../../Services/HttpService";
import '../../Pages/Home.css';
import iyte_icon from '../../Components/Assets/iyte-logo.png';
import user_icon from '../../Components/Assets/user.png';
import admin_icon from '../../Components/Assets/shield.png';
import student_icon from '../../Components/Assets/studentbook.png';
import grade_icon from '../../Components/Assets/grades.png';
import announcement_icon from '../../Components/Assets/announcements.png';

const CompanyHomeV2 =({children}) => {
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
      console.log(currentUser.name); // currentUser her güncellendiğinde bu çalışır
    }, [currentUser]);
  
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await GetWithAuth("/company/token/" + localStorage.getItem("tokenKey"));
              const result = await response.json();
              setCurrentUser(result);
              console.log(currentUser.name);
          } catch (error) {
              console.log(error);
              console.log("User not found");
          }
      };
  
      const timeout = setTimeout(() => {
          fetchData();
      }, 1); 
  
      return () => clearTimeout(timeout); // useEffect'in temizleme fonksiyonu, bileşen kaldırıldığında zamanlayıcıyı temizler
  
    }, []);
  
    return (
      <div className="home-layout">
      <div className="top-bar">
          <Link to="/comp-home" style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }}> 
              <img src={iyte_icon} alt="" className="iyte-logo" /><b>IZTECH IMS</b>
          </Link>
      
          <div className="top-bar-button" style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }} onClick={() => toggleDropdown('userbtn')}>
          <h4>{currentUser.name}</h4>
          <img src={user_icon} alt="User" className="user-icon" /> 
            </div>
          {showDropdown.userbtn && (
            <div className="dropdown-content"   style={{ position: 'absolute',right: '0', top: '50px',  width:'150px',marginLeft:'auto'}}>

              <Link to="/comp-profile" className="link-button">Profile</Link> 
              
              <div className="nested-dropdown" onClick={() => toggleDropdown('userbtn_2')}>
                <a href="https://ubys.iyte.edu.tr" target="_blank" rel="noopener noreferrer" className="link-button">UBYS</a>
              </div>
              <div className="nested-dropdown" onClick={() => toggleDropdown('userbtn_3')} >
                <Link to="/comp-settings" className="link-button">User Settings</Link>   
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
            </div>
          </div>
  
          {/* Button 1 */}
          <div className="sidebar-btn" >
            <img src={announcement_icon} alt="" className="announcement-icon" />
            <Link to="/comp-announcements"  style={{textDecoration:"none", color:"black"}}>Announcements</Link>
          </div>

          {/* Button 2 */}
            <div className="sidebar-btn" >
             <img src={student_icon} alt="" className="student-icon" />
             <Link to="/comp-students" className="" style={{textDecoration:"none", color:"black"}}>Students</Link>
            </div>
  


          <div className="sidebar-btn">
            <img src={grade_icon} alt="" className="grade-icon" />
                <Link to="/comp-interns"  style={{textDecoration:"none", color:"black"}} >My Interns</Link>
          </div>
        </div>
        <main>{children}</main>
      </div>
  
    );
  }
  
  export default CompanyHomeV2;