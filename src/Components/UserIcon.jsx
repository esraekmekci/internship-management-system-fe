import { Link } from "react-router-dom";

export default function UserIcon({ onClick, role, dropdownExpanded, iconRef }) {
  return (
    <div
      ref={iconRef}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "40px",
        width: "40px",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "20px",
            right: "0",
            bottom: "0",
            left: "0",
          }}
          onClick={onClick}
        >
          <i
            className="material-icons user-icon-v2"
            style={{
              color: "#450a0a",
              backgroundColor: "#f8fafc",
              fontSize: "32px",
              cursor: "pointer",
              border: "1px solid #cbd5e1",
              padding: "3px",
              borderRadius: "50%",
              boxShadow:
                "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);",
            }}
          >
            person
          </i>
        </div>

        {dropdownExpanded && (
          <div
            style={{
              boxSizing: "border-box",
              position: "absolute",
              width: "250px",
              top: "60px",
              right: "-10px",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              backgroundColor: "#f8fafc",
              fontWeight: "600",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link to={`profile`} className="icon-list-item">
                <i className="material-icons" style={{ color: "#64748b" }}>
                  person
                </i>
                <div>Profile</div>
              </Link>
              <Link to={`settings`} className="icon-list-item">
                <i className="material-icons" style={{ color: "#64748b" }}>
                  manage_accounts
                </i>
                <div>User Settings</div>
              </Link>

              <a
                href="https://ubys.iyte.edu.tr/"
                noopener
                noreferrer
                target="_blank"
                style={{ padding: "12px" }}
                className="icon-list-item"
              >
                <i className="material-icons" style={{ color: "#64748b" }}>
                  public
                </i>
                <div>UBYS</div>
              </a>
              <a
                href="https://ubysdestek.iyte.edu.tr/"
                noopener="true"
                noreferrer="true"
                target="_blank"
                style={{ padding: "12px" }}
                className="icon-list-item"
              >
                <i className="material-icons" style={{ color: "#64748b" }}>
                  help
                </i>
                <div>Get Help</div>
              </a>
              <Link to={`/log_out`} className="icon-list-item">
                <i className="material-icons" style={{ color: "#64748b" }}>
                  logout
                </i>
                <div>Log out</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
