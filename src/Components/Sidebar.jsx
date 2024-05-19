import React, { useState } from "react";

const tabs = [
  { name: "Secretary Actions", link: "" },
  { name: "General Documents", link: "" },
  { name: "General Settings", link: "" },
];

const subtabs = {
  "Secretary Actions": [{ name: "Students", link: "" }],
  "General Documents": [
    { name: "User Guide", link: "" },
    { name: "IZTECH Website", link: "" },
  ],
  "General Settings": [
    { name: "User Settings", link: "" },
    { name: "Help", link: "" },
    { name: "Log out", link: "" },
  ],
};

export default function Sidebar() {
  const [expandedTabs, setExpandedTabs] = useState({});

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
        padding: "10px",
      }}
    >
      {tabs.map((tab) => (
        <div key={tab.name}>
          <div
            className="sidebar-item"
            onClick={() => handleTabClick(tab.name)}
            style={{
              cursor: "pointer",
              padding: "10px",
              transition: "background-color 0.2s",
              borderRadius: "8px",
              fontWeight: "600",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid transparent",
            }}
          >
            {tab.name}
            <span>
              {expandedTabs[tab.name] ? (
                <i className="material-icons">expand_less</i>
              ) : (
                <i className="material-icons">expand_more</i>
              )}
            </span>
          </div>
          {expandedTabs[tab.name] && (
            <div style={{}}>
              {subtabs[tab.name].map((subtab) => (
                <div
                  key={subtab.name}
                  className="sidebar-item"
                  style={{
                    padding: "5px 20px",
                    fontWeight: "500",
                    borderRadius: "8px",
                    opacity: expandedTabs[tab.name] ? 1 : 0,
                    transform: expandedTabs[tab.name]
                      ? "translateY(0)"
                      : "translateY(-10px)",
                    transition: "0.2s",
                    cursor: "pointer",
                  }}
                >
                  <a href={subtab.link}>
                    <div style={{ display: "flex" }}>
                      <i className="material-icons">chevron_right</i>
                      {subtab.name}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
