import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./SecretaryHome.css";
import iyte_icon from "../../Components/Assets/iyte-logo.png";
import user_icon from "../../Components/Assets/user.png";
import settings_icon from "../../Components/Assets/settings.png";
import internship_icon from "../../Components/Assets/internship.png";
import documents_icon from "../../Components/Assets/documents.png";
import admin_icon from "../../Components/Assets/shield.png";
import company_icon from "../../Components/Assets/company.png";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const tabs = [
  { name: "View Students", link: "/secretary/students", icon: "group" }
]


export default function SecretaryHome() {
  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header role={"Secretary"} />
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
