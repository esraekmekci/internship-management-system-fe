import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { GetWithAuth } from "../../Services/HttpService";
import "../../Pages/Home.css";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useUser } from "../../Components/UserContext.jsx";
import Loading from "../../Pages/LoadingPage.jsx";

const tabs = [
  { name: "See Students", link: "/comp/students", icon: "people" },
  { name: "Announcements", link: "/comp/announcements", icon: "campaign" },
  { name: "My Interns", link: "/comp/interns", icon: "supervisor_account" },
];


const CompanyHomeV2 = ({ children }) => {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetWithAuth(
          "/api/company/token/" + localStorage.getItem("tokenKey")
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
  }, []);

  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header role={"company"} />
        <div
          style={{
            display: "flex",
            flexGrow: "1",
            backgroundColor: "white",
            overflowY: "hidden",
          }}
        >
          <Sidebar tabs={tabs}/>
          <Outlet /> {/*/secretary'nin child objeleri buraya geliyor. */}
          <Loading isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CompanyHomeV2;
