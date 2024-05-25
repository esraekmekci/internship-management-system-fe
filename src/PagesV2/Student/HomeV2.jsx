import React, { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { GetWithAuth } from "../../Services/HttpService.js";
import "../../Pages/Home.css";
import Announcement from "./AnnouncementV2.jsx";
import Header from "../../Components/Header.jsx";
import Sidebar from "../../Components/Sidebar.jsx";
import { useUser } from "../../Components/UserContext.jsx";

const tabs = [
  {
    name: "View Announcements",
    link: "/student/announcement",
    icon: "campaign",
  },
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
