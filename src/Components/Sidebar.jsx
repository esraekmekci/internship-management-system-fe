import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ tabs }) {
  const pathName = useLocation().pathname;

  const handleTabClick = (tab) => {
    setExpandedTabs({
      ...expandedTabs,
      [tab]: !expandedTabs[tab],
    });
  };

  return (
    <div
      style={{
        flex: "0 0 300px",
        overflow: "auto",
        height: "100%",
        borderRight: "1px solid rgb(226 232 240)",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      {tabs.map((tab) => (
        <div key={tab.name}>
          <Link to={tab.link}>
            <div
              className={`sidebar-item ` + (tab.link === pathName ? ` sidebar-active` : ``)}
              onClick={() => {}}
              style={{
                cursor: "pointer",
                padding: "15px 0px 15px 20px",
                fontWeight: "600",
                display: "flex",
                color: "#1e293b",
                fontSize: "16px",
                alignItems: "center",
                gap: "8px",
                border: "1px solid transparent",
              }}
            >
              <i className="material-icons" style={{color: "gray"}}>{tab.icon}</i>
              {tab.name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
