import iyte_icon from "../Components/Assets/iyte-logo.png";

export default function Header({ role }) {
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: "white",
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "90vw",
          width: "inherit",
          margin: "0 auto",
          padding: "8px 2px",
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
            <p style={{ color: "gray" }}>IZTECH IMS /</p>
            <p style={{ color: "rgb(153 27 27)" }}>{role}</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
