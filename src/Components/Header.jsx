import { useLocation } from "react-router-dom";
import iyte_icon from "../Components/Assets/iyte-logo.png";
import UserIcon from "./UserIcon";
import { useEffect, useState, useRef } from "react";

export default function Header({ role }) {
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const iconRef = useRef(null);

  const handleClick = () => {
    setDropdownExpanded(!dropdownExpanded);
  };
  const handleClickOutside = (event) => {
    if (iconRef.current && !iconRef.current.contains(event.target)) {
      setDropdownExpanded(false);
    }
  };
  const pathName = useLocation().pathname.slice(1).split("/")[0];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: "white",
        flex: "0 0 auto",
        border: "1px solid grey",
        borderColor: "rgb(226 232 240)",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "95vw",
          width: "inherit",
          margin: "0 auto",
          padding: "10px 4px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "justify-center",
              gap: "4px",
            }}
          >
            <a href="/home">
              <img src={iyte_icon} alt="iyte icon" width={"60px"} />
            </a>
            <p style={{ color: "gray" }}>IZTECH IMS</p>
              <p>
                <span style={{ color: "gray" }}> /</span>
                <span style={{ color: "rgb(153 27 27)" }}>
                  {" "}
                  {pathName.charAt(0).toUpperCase() + pathName.slice(1)} 
                </span> 
              </p>
          </div>
          <UserIcon
            onClick={handleClick}
            dropdownExpanded={dropdownExpanded}
            role={role}
            iconRef={iconRef}
          />
        </div>
      </div>
    </div>
  );
}
