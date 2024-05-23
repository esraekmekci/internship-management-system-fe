import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { GetWithAuth } from "../../Services/HttpService.js";
import "../../Pages/Home.css";
import Announcement from "./AnnouncementV2.jsx";
import Header from "../../Components/Header.jsx";
import Sidebar from "../../Components/Sidebar.jsx";
import { useUser } from "../../Components/UserContext.jsx";

const tabs = [
    { name: "View Announcements", link: "/student/announcement", icon: "campaign" },
    { name: "View Applications", link: "/student/applications", icon: "draw" },
    { name: "Templates", link: "/student/templates", icon: "article" },
    { name: "Documents", link: "/student/documents", icon: "description" },
];

const Home = ({ children }) => {
  const { setUser } = useUser();
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
    console.log(localStorage.getItem("tokenKey"));
    const fetchData = async () => {
      try {
        const response = await GetWithAuth(
          "/student/token/" + localStorage.getItem("tokenKey")
        );
        const result = await response.json();
        setUser(result);
      } catch (error) {
        console.log(error);
        console.log("User not found");
      }
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 1);

    return () => clearTimeout(timeout); // useEffect'in temizleme fonksiyonu, bileşen kaldırıldığında zamanlayıcıyı temizler
  }, [setUser]);

  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header role={"student"} />
        <div
          style={{
            display: "flex",
            flexGrow: "1",
            backgroundColor: "white",
            overflowY: "hidden",
          }}
        >
          <Sidebar tabs={tabs} />
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
