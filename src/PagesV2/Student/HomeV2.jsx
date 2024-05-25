import React, { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { GetWithAuth } from "../../Services/HttpService.js";
import "../../Pages/Home.css";
import Announcement from "./AnnouncementV2.jsx";
import Header from "../../Components/Header.jsx";
import Sidebar from "../../Components/Sidebar.jsx";
import { useUser } from "../../Components/UserContext.jsx";
import Loading from "../../Pages/LoadingPage.jsx";

const tabs = [
  {
    name: "View Announcements",
    link: "/std/announcement",
    icon: "campaign",
  },
  { name: "View Applications", link: "/std/applications", icon: "draw" },
  { name: "Templates", link: "/std/templates", icon: "article" },
  { name: "Documents", link: "/std/documents", icon: "description" },
];

const Home = ({ children }) => {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true); 
  const content = children || <Announcement />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetWithAuth(
          "/api/student/token/" + localStorage.getItem("tokenKey")
        );
        const result = await response.json();
        setUser(result);
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
          <Loading isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Home;
