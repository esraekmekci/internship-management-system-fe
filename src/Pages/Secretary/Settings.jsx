import React, { useState } from "react";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warnings, setWarnings] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    alert("Password changed successfully");
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    if (password.length < 8) {
      setWarnings("Password should be at least 8 characters.");
    } else {
      setWarnings("");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        border: "1px solid #dadce0",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#202124",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Change Password
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
              display: "block",
              color: "gray",
              fontSize: "14px",
              fontFamily: "Roboto, sans-serif",
            }}
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{
              width: "95%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #dadce0",
              fontSize: "16px",
              fontFamily: "Roboto, sans-serif",
              backgroundColor: "#f8f9fa",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
              color: "gray",
              fontSize: "14px",
              display: "block",
              fontFamily: "Roboto, sans-serif",
            }}
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            style={{
              width: "95%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #dadce0",
              fontSize: "16px",
              fontFamily: "Roboto, sans-serif",
              backgroundColor: "#f8f9fa",
            }}
            required
          />
          {warnings && (
            <p
              style={{
                color: "#d93025",
                fontSize: "14px",
                fontFamily: "Roboto, sans-serif",
                marginTop: "8px",
              }}
            >
              {warnings}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              color: "gray",
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "bold",
              display: "block",
              fontFamily: "Roboto, sans-serif",
            }}
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "95%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #dadce0",
              fontSize: "16px",
              fontFamily: "Roboto, sans-serif",
              backgroundColor: "#f8f9fa",
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "rgb(153 27 27)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
            transition: "background-color 0.3s",
          }}
          onSubmit={handleSubmit}
          onMouseEnter={(e) => (e.target.style.backgroundColor = " rgb(127 29 29)")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(153 27 27)")}
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
