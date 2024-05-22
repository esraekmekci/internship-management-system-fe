import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { GetWithAuth } from "../../Services/HttpService";
import "../../Pages/Coordinator/CoordinatorHome.css";
import iyte_icon from "../../Components/Assets/iyte-logo.png";
import user_icon from "../../Components/Assets/user.png";
import documents_icon from "../../Components/Assets/documents.png";
import admin_icon from "../../Components/Assets/shield.png";
import student_icon from "../../Components/Assets/studentbook.png";
import announcement_icon from "../../Components/Assets/announcements.png";
import loading_icon from "../../Components/Assets/loading.png";
import company_icon from "../../Components/Assets/company.png";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const tabs = [
  { name: "Coordinator Actions", link: "" },
  { name: "General Documents", link: "" },
  { name: "General Settings", link: "" },
];

const subtabs = {
  "Coordinator Actions": [
    { name: "See Students", link: "/coordinator/students" },
    { name: "Announcements", link: "/coordinator/announcements" },
    { name: "Guidelines", link: "/coordinator/guidelines" },
  ],
  "General Documents": [
    { name: "User Guide", link: "" },
    { name: "IZTECH Website", link: "" },
  ],
  "General Settings": [
    { name: "User Settings", link: "/coordinator/settings" },
    { name: "Profile", link: "/coordinator/profile" },
    { name: "Help", link: "" },
    { name: "Log out", link: "/log_out" },
  ],
};

/*
Coordinator home'u template olarak kullanıyoruz
Coordinator olarak giriş yapıldığında direkt Coordinator Announcement'a yönlendirilmeli
Benimle çalışan kişi yaptıkça commentleri silmeyi unutma pls.
*/

const CoordinatorHomeV2 = ({ children }) => {
  var [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
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
    const fetchData = async () => {
      try {
        const response = await GetWithAuth(
          "/coordinator/token/" + localStorage.getItem("tokenKey")
        );
        const result = await response.json();
        console.log(result);
        setCurrentUser(result);
        console.log(currentUser.name);
      } catch (error) {
        console.log(error);
        console.log("User not found");
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 1);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loading_icon} alt="loading" className="loading-img" />
      </div>
    );
  }

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

export default CoordinatorHomeV2;
