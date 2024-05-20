import { useLocation } from "react-router-dom";
import iyte_icon from "../Components/Assets/iyte-logo.png";

export default function Header({ role }) {
  const breadcrumb = useLocation().pathname.slice(1).split('/');
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: "white",
        flex: '0 0 auto',
        border: '1px solid grey',
        borderColor: 'rgb(226 232 240)',

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
            {breadcrumb.map((path) => (
              <p>
                <span style={{ color: "gray" }}> /</span>
                <span style={{ color: "rgb(153 27 27)" }}> {path.charAt(0).toUpperCase() + path.slice(1)}</span>
              </p>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
