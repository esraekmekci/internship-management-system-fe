import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./SecretaryHome.css";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useUser } from "../../Components/UserContext.jsx";
import { GetWithAuth } from "../../Services/HttpService.js";

const tabs = [
  { name: "View Students", link: "/sec/students", icon: "group" }
]


export default function SecretaryHome() {
  const { setUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetWithAuth(
          "/api/secretary/token/" + localStorage.getItem("tokenKey")
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
  }, []);

  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header role={"secretary"} />
        <div
          style={{ display: "flex", flexGrow: '1', backgroundColor: "white", overflowY: "hidden"}}
        >
          <Sidebar tabs={tabs} />
          <Outlet />  {/*/secretary'nin child objeleri buraya geliyor. */}
        </div>
      </div>
    </div>
  );
}
