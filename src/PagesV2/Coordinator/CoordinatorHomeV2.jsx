import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { GetWithAuth } from "../../Services/HttpService";
import "../../Pages/Coordinator/CoordinatorHome.css";
import loading_icon from "../../Components/Assets/loading.gif";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useUser } from "../../Components/UserContext.jsx";

const tabs = [
    { name: "See Students", link: "/coor/students", icon: "people" },
    { name: "Announcements", link: "/coor/announcements", icon: "campaign" },
    { name: "Companies", link: "/coor/companies", icon: "apartment" },
    { name: "Guidelines", link: "/coor/guidelines", icon: "import_contacts" },
  ];

/*
Coordinator home'u template olarak kullanıyoruz
Coordinator olarak giriş yapıldığında direkt Coordinator Announcement'a yönlendirilmeli
Benimle çalışan kişi yaptıkça commentleri silmeyi unutma pls.
*/

const CoordinatorHomeV2 = ({ children }) => {
  var [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();
  
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
        <Header role={"coordinator"} />
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

export default CoordinatorHomeV2;
