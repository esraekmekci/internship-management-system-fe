import iyte_icon from "../Components/Assets/iyte-logo.png";

export default function Header({ role }) {
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
            <p style={{ color: "gray" }}>IZTECH IMS /</p>
            <p style={{ color: "rgb(153 27 27)" }}>{role}</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
