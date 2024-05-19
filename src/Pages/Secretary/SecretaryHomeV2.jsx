import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SecretaryHome.css";
import iyte_icon from "../../Components/Assets/iyte-logo.png";
import user_icon from "../../Components/Assets/user.png";
import settings_icon from "../../Components/Assets/settings.png";
import internship_icon from "../../Components/Assets/internship.png";
import documents_icon from "../../Components/Assets/documents.png";
import admin_icon from "../../Components/Assets/shield.png";
import company_icon from "../../Components/Assets/company.png";
import Header from "../../Components/Header";

export default function SecretaryHomeV2() {
  return (
    <div
      style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}
    >
      <div>
        <Header role={'Secretary'}/>

      </div>
    </div>
  );
}
