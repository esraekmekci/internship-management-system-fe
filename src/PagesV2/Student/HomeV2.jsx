import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { GetWithAuth } from "../../Services/HttpService.js";
import "../../Pages/Home.css";
import iyte_icon from "../../Components/Assets/iyte-logo.png";
import user_icon from "../../Components/Assets/user.png";
import internship_icon from "../../Components/Assets/internship.png";
import documents_icon from "../../Components/Assets/documents.png";
import admin_icon from "../../Components/Assets/shield.png";
import company_icon from "../../Components/Assets/company.png";
import announcements_icon from "../../Components/Assets/announcements.png";
import Announcement from "./AnnouncementV2.jsx";
import Header from "../../Components/Header.jsx";
import Sidebar from "../../Components/Sidebar.jsx";

const tabs = [
  { name: "Student Actions", link: "" },
  { name: "General Documents", link: "" },
  { name: "General Settings", link: "" },
];

const subtabs = {
  "Student Actions": [
    { name: "View Announcements", link: "/student/announcement" },
    { name: "View Applications", link: "/student/applications" },
  ],
  "General Documents": [
    { name: "Templates", link: "/student/templates" },
    { name: "Documents", link: "/student/documents" },
    { name: "User Guide", link: "" },
    { name: "IZTECH Website", link: "" },
  ],
  "General Settings": [
    { name: "User Settings", link: "/student/settings" },
    { name: "Profile", link: "/student/profile" },
    { name: "Help", link: "" },
    { name: "Log out", link: "/log_out" },
  ],
};

const Home = ({ children }) => {
  var [currentUser, setCurrentUser] = useState({});

  const content = children || <Announcement />;

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
    userbtn: false,
    userbtn_1: false,
    userbtn_2: false,
    userbtn_3: false,
    userbtn_4: false,
    userbtn_5: false,
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
        const response = await GetWithAuth(
          "/student/token/" + localStorage.getItem("tokenKey")
        );
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
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header role={"Secretary"} />
        <div
          style={{
            display: "flex",
            flexGrow: "1",
            backgroundColor: "white",
            overflowY: "hidden",
          }}
        >
          <Sidebar tabs={tabs} subtabs={subtabs} />
          <Outlet /> {/*/secretary'nin child objeleri buraya geliyor. */}
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* Button 2 */
}
{
  /* <div
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
        </div> */
}

{
  /* Button 4 */
}
{
  /* <div
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
        </div> */
}

{
  /* <div className="sidebar-btn">
          <img src={company_icon} alt="Person" className="company" />         
              <Link to="/companies"  style={{textDecoration:"none", color:"black"}} >Companies</Link>             
        </div> */
}
