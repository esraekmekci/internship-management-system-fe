import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetWithAuth } from "../Services/HttpService.js";
import './Home.css';
import iyte_icon from '../Components/Assets/iyte-logo.png';
import user_icon from '../Components/Assets/user.png';
import internship_icon from '../Components/Assets/internship.png';
import documents_icon from '../Components/Assets/documents.png';
import admin_icon from '../Components/Assets/shield.png';
import company_icon from '../Components/Assets/company.png';
import announcements_icon from '../Components/Assets/announcements.png';
import Announcement from './Announcement.js';


const Home =({children}) => {
  var [currentUser, setCurrentUser] = useState({});

  const content = children || <Announcement/>;
  
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
    console.log(currentUser.studentID); // currentUser her güncellendiğinde bu çalışır
  }, [currentUser]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetWithAuth("/student/token/" + localStorage.getItem("tokenKey"));
        const result = await response.json();
        console.log(result);
        setCurrentUser(result);
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
          <Link to="/home" style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }}> 
              <img src={iyte_icon} alt="" className="iyte-logo" /><b>IZTECH IMS</b>
          </Link>
      
          <div className="top-bar-button" style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }} onClick={() => toggleDropdown('userbtn')}>
          <h4>{currentUser.name}</h4>
          <img src={user_icon} alt="User" className="user-icon" /> 
            </div>
          {showDropdown.userbtn && (
            <div className="dropdown-content"   style={{ position: 'absolute',right: '0', top: '50px',  width:'150px',marginLeft:'auto'}}>

              <Link to="/profile" className="link-button">Profile</Link>
              
              <div className="nested-dropdown" onClick={() => toggleDropdown('userbtn_2')}>
                <a href="https://ubys.iyte.edu.tr" target="_blank" rel="noopener noreferrer" className="link-button">UBYS</a>
              </div>
              <div className="nested-dropdown" onClick={() => toggleDropdown('userbtn_3')} >
                <Link to="/user_settings" className="link-button">User Settings</Link>   
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
            {currentUser.role}
            <br/>
          </div>
        </div>


        {/* Button 2 */}
        {/* <div
          className="sidebar-btn"
          onClick={() => toggleDropdown('btn2')}
          //onMouseLeave={() => toggleDropdown('btn2')}
        >
          <img src={user_icon} alt="Person" className="user-icon" />User Actions
          {showDropdown.btn2 && (
            <div className="dropdown-content">
              <Link to="/profile" className="link-button">Profile</Link>
              <div
                className="nested-dropdown"
                onClick={() => toggleDropdown('btn2_1')}
                //onMouseLeave={() => toggleDropdown('btn2_1')}
              >
                <a href="https://ubys.iyte.edu.tr" className="link-button" target="_blank" rel="noopener noreferrer">UBYS</a>
                
              </div>

            </div>
          )}
        </div> */}
        
        
          {/* Button 4 */}
          {/* <div
          className="sidebar-btn"
          onClick={() => toggleDropdown('btn4')}
          //onMouseLeave={() => toggleDropdown('btn4')}
        >
          <img src={settings_icon} alt="Person" className="settings-icon" />
          General Settings
          {showDropdown.btn4 && (
            <div className="dropdown-content">
              <Link to="/user_settings" className="link-button">User Settings</Link>
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
        </div> */}


        <div className="sidebar-btn">
          <img src={announcements_icon} alt="Person" className="user-icon" />         
              <Link to="/announcement"  style={{textDecoration:"none", color:"black"}} >Announcements</Link>             
        </div>

        <div className="sidebar-btn">
          <img src={documents_icon} alt="Person" className="documents-icon" />
              <Link to="/applications"  style={{textDecoration:"none", color:"black"}} >Applications</Link>
        </div>

        {/* <div className="sidebar-btn">
          <img src={company_icon} alt="Person" className="company" />         
              <Link to="/companies"  style={{textDecoration:"none", color:"black"}} >Companies</Link>             
        </div> */}

        <div className="sidebar-btn">
          <img src={documents_icon} alt="Person" className="documents-icon" />         
              <Link to="/templates"  style={{textDecoration:"none", color:"black"}} >Templates</Link>             
        </div>

        {/* Button 3 */}
        <div className="sidebar-btn">
          <img src={documents_icon} alt="Person" className="documents-icon" />
          <Link to="/documents"  style={{textDecoration:"none", color:"black"}}>Documents</Link>
        </div>





      </div>
      <main>{content}</main>
    </div>

  );
}

export default Home;
