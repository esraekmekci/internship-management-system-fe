import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { GetWithAuth, PostWithoutAuth } from "../Services/HttpService";
import email_icon from "../Components/Assets/email-icon.png";
import password_icon from "../Components/Assets/padlock.png";
import employees_icon from "../Components/Assets/employees.png";
import company_icon from "../Components/Assets/building.png";
import calendar_icon from "../Components/Assets/calendar-day.png";
import companyAddress from "../Components/Assets/location.png";
import iyte_icon from "../Components/Assets/iyte-logo.png";
import studentID from "../Components/Assets/id-card.png";
import internTypeIcon from "../Components/Assets/online-work.png";
import representative_icon from "../Components/Assets/employee-man.png";

const roles = ["COORDINATOR", "STUDENT", "COMPANY", "SECRETARY"];

const LoginSignup = () => {
  useEffect(() => {
    console.log("cleared");
    localStorage.clear();
  }, []);
  const [role, setRole] = useState("COORDINATOR");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [compName, setCompName] = useState("");
  const [compRepName, setCompRepName] = useState("");
  const [compAddress, setCompAddress] = useState("");
  const [foundationYear, setFoundationYear] = useState("");
  const [employeeSize, setEmployeeSize] = useState("");
  const [internshipType, setInternshipType] = useState("");

  const [token, setToken] = useState("");

  const [showCheckboxPopup, setShowCheckboxPopup] = useState(false);
  const [showKVKKPopup, setShowKVKKPopup] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [showKVKKPopupForCompany, setShowKVKKPopupForCompany] = useState(false);

  const [stID, setStudentID] = useState("");
  const [action, setAction] = useState("Login");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === "COMPANY" && action === "Sign Up as Company") {
      if (!showKVKKPopupForCompany) {
        setShowKVKKPopupForCompany(true);
      } else {
        registerAsCompany();
      }
    } else {
      login();
    }
  };

  const handleStudentIDChange = (event) => {
    setStudentID(event.target.value);
  };
  const handleCompNameChange = (event) => {
    setCompName(event.target.value);
  };
  const handleCompAddressChange = (event) => {
    setCompAddress(event.target.value);
  };
  const handleFoundationYearChange = (event) => {
    setFoundationYear(event.target.value);
  };
  const handleEmployeeSizeChange = (event) => {
    setEmployeeSize(event.target.value);
  };
  const handleCompRepNameChange = (event) => {
    setCompRepName(event.target.value);
  };
  const handleInternshipTypeChange = (event) => {
    setInternshipType(event.target.value);
  };
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setEmail("");
    setPassword("");
    setCompName("");
    setCompRepName("");
    setCompAddress("");
    setFoundationYear("");
    setEmployeeSize("");
    setInternshipType("");
    setStudentID("");
  };

  const login = () => {
    PostWithoutAuth("/api/auth/login", {
      email: role === "STUDENT" ? stID : email,
      password: password,
      role: role,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          console.log(token);
          console.log(res);
          localStorage.setItem("tokenKey", res.token);
          localStorage.setItem("role", res.authorities);
          console.log(res.authorities)
          if (res.authorities.includes("STUDENT")) {
            setToken(res.token);
            setShowCheckboxPopup(!res.registered);
            if (res.registered) {
              alert(`Logging in as a ${role} with student ID: ${stID}`);
              navigate("/student");
            }
          } else if (res.authorities.includes("SECRETARY")) {
            alert(`Logging in as a ${role} with email: ${email}`);
            navigate("/secretary");
          } else if (res.authorities.includes("COORDINATOR")) {
            alert(`Logging in as a ${role} with email: ${email}`);
            navigate("/coordinator");
          } else if (res.authorities.includes("COMPANY")) {
            alert(`Logging in as a ${role} with email: ${email}`);
            navigate("/company");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("User not found");
        if (role === "STUDENT") {
          alert(`Wrong student ID or password. Try again.`);
        } else if (role === "COMPANY") {
          alert(
            `No company account approved by the coordinator was found with this email: ${email}`
          );
        } else {
          alert(`Wrong email or password. Try again.`);
        }
      });
  };

  const handlePopupSubmit = () => {
    if (role === "STUDENT" && checkbox1 && checkbox2) {
      //setShowCheckboxPopup(false);
      alert(`Logging in as a ${role} with student ID: ${stID}`);
      localStorage.setItem("tokenKey", token);
      localStorage.setItem("role", "STUDENT")
      navigate("/student");
    } else if (role === "COMPANY" && checkbox1 && checkbox2) {
      setShowKVKKPopupForCompany(false);
      setTimeout(() => {
        registerAsCompany();
      }, 100);
      setEmail("");
      setPassword("");
      setCompName("");
      setCompAddress("");
      setFoundationYear("");
      setEmployeeSize("");
      setCompRepName("");
      setInternshipType("");
    } else {
      alert("Please check both checkboxes before proceeding.");
    }
  };

  const handleCheckbox1Change = (event) => {
    setCheckbox1(event.target.checked);
  };

  const handleCheckbox2Change = (event) => {
    setCheckbox2(event.target.checked);
  };

  const registerAsCompany = () => {
    PostWithoutAuth("/auth/register", {
      compName: compName,
      compAddress: compAddress,
      foundationYear: foundationYear,
      empSize: employeeSize,
      name: compRepName,
      email: email,
      password: password,
      role: role,
      internshipType: internshipType,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          console.log(internshipType);
          alert(
            `Registration as ${compName} is successful. Waiting for the approval of the internship committee coordinator.`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("User not found");
        alert(`Registration failed. Try again.`);
      });
  };

  const handleAction = (event) => {
    if (action === "Login" && event.target.innerText === "Sign Up") {
      setAction("Sign Up as Company");
      // registerAsCompany();
    } else if (
      action === "Sign Up as Company" &&
      event.target.innerText === "Login"
    ) {
      setAction("Login");
    }
  };

  return (
    <div className="login-signup-container">
      <div className="top-bar">
        <img src={iyte_icon} alt="" className="iyte-logo" />
        <b>IZTECH IMS</b>
        <div
          className="top-bar-container"
          style={{ right: "0", marginLeft: "auto" }}
        >
          {roles.map((r) => (
            <button
              key={r}
              className={role === r ? "active" : ""}
              onClick={() => handleRoleChange(r)}
            >
              {r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="form-container">
        {role === "STUDENT" ? (
          <div>
            <div className="header">
              <div className="loginTitle">Login with UBYS</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <div className="input-container">
                  <img
                    src={studentID}
                    style={{ height: "25px" }}
                    alt="Student ID"
                  />
                  <input
                    type="text"
                    placeholder="Student ID"
                    value={stID}
                    onChange={handleStudentIDChange}
                    required
                  />
                </div>
                <div className="input-container">
                  <img
                    src={password_icon}
                    style={{ height: "25px" }}
                    alt="Password"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <div className="login-note">
                <p style={{ color: "#797979", fontSize: "14px" }}>
                  *Please enter your UBYS credentials.
                </p>
              </div>
              <div
                className="submit-container"
                style={{ justifyContent: "flex-end" }}
              >
                <button className="submit" onClick={() => setAction("Login")}>
                  <span className="submitspan">Login</span>
                </button>
              </div>
              {showCheckboxPopup && (
                <div className="popup">
                  <h3>Please accept the terms and conditions</h3>
                  <div style={{ textAlign: "left" }}>
                    <input
                      type="checkbox"
                      id="checkbox1"
                      checked={checkbox1}
                      onChange={handleCheckbox1Change}
                    />
                    <label htmlFor="checkbox1">
                      I agree to transfer my UBYS information to the Internship
                      Management System.
                    </label>
                  </div>
                  <br />
                  <div style={{ textAlign: "left" }}>
                    <input
                      type="checkbox"
                      id="checkbox2"
                      checked={checkbox2}
                      onChange={handleCheckbox2Change}
                    />
                    <label htmlFor="checkbox2">
                      I have read and approve the
                      <span
                        onClick={() => setShowKVKKPopup(true)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {" "}
                        KVKK
                      </span>
                      .
                    </label>
                  </div>
                  <div className="popup-buttons">
                    <button onClick={handlePopupSubmit}>Confirm</button>
                    <button onClick={() => setShowCheckboxPopup(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {showKVKKPopup && (
                <div className="popup">
                  <h3>KVKK</h3>
                  <div
                    style={{
                      textAlign: "left",
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    In accordance with the Law on the Protection of Personal
                    Data No. 6698 ("KVKK"), we inform you about the purposes of
                    processing your personal data, the legal reasons, the
                    methods of collecting data, and your rights regarding your
                    personal data.
                    <br></br>
                    1. Data Controller<br></br>
                    The data controller is Internship Management System.
                    <br></br>
                    2. Purposes of Data Processing<br></br>
                    Your personal data will be processed for the following
                    purposes: To manage and provide the services of the
                    Internship Management System To communicate with users To
                    improve our services To fulfill legal obligations<br></br>
                    3. Legal Basis for Data Processing<br></br>
                    Your personal data is processed based on the following legal
                    grounds: Your explicit consent The necessity for the
                    performance of a contract Compliance with legal obligations
                    <br></br>
                    4. Methods of Collecting Personal Data<br></br>
                    Your personal data is collected through: Information you
                    provide during registration and use of the system Automatic
                    data collection methods when using our platform<br></br>
                    5. Your Rights<br></br>
                    In accordance with KVKK, you have the following rights: To
                    learn whether your personal data is processed To request
                    information about data processing To request the correction
                    of inaccurate data To request the deletion or destruction of
                    your personal data To object to processing under certain
                    conditions<br></br>
                    <br></br>
                    By accepting this notice, you acknowledge that you have
                    read, understood, and consent to the processing of your
                    personal data as described above.
                  </div>
                  <div className="popup-buttons">
                    <button onClick={() => setShowKVKKPopup(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : role === "COMPANY" ? (
          <div>
            <div className="header">
              <div className="loginTitle">{action}</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                {action === "Login" ? (
                  <div></div>
                ) : (
                  <div>
                    <div className="input-container">
                      <img
                        src={company_icon}
                        style={{ height: "25px" }}
                        alt="Company Name"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={compName}
                        onChange={handleCompNameChange}
                        required
                      />
                    </div>
                    <div className="input-container">
                      <img
                        src={companyAddress}
                        style={{ height: "25px" }}
                        alt="Company Address"
                      />
                      <input
                        type="text"
                        placeholder="Company Address"
                        title="Example: İzmir, TR"
                        value={compAddress}
                        onChange={handleCompAddressChange}
                        required
                      />
                    </div>
                    <div className="input-container">
                      <img
                        src={calendar_icon}
                        style={{ height: "25px" }}
                        alt="Foundation Year"
                      />
                      <input
                        type="text"
                        placeholder="Foundation Year"
                        value={foundationYear}
                        onChange={handleFoundationYearChange}
                        required
                      />
                    </div>
                    <div className="input-container">
                      <img
                        src={internTypeIcon}
                        style={{ height: "28px" }}
                        alt="Internship Type"
                      />
                      <select
                        className="selectInternshipType"
                        required
                        value={internshipType}
                        onChange={handleInternshipTypeChange}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Internship Type
                        </option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                        <option value="On-Site">On-Site</option>
                      </select>
                    </div>

                    <div className="input-container">
                      <img
                        src={employees_icon}
                        style={{ height: "25px" }}
                        alt="Employee Size"
                      />
                      <input
                        type="text"
                        placeholder="Employee Size"
                        value={employeeSize}
                        onChange={handleEmployeeSizeChange}
                        required
                      />
                    </div>
                    <div className="input-container">
                      <img
                        src={representative_icon}
                        style={{ height: "25px" }}
                        alt="Representative Name"
                      />
                      <input
                        type="text"
                        placeholder="Representative Name"
                        value={compRepName}
                        onChange={handleCompRepNameChange}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="input-container">
                  <img
                    src={email_icon}
                    style={{ height: "25px" }}
                    alt="Company email"
                  />
                  <input
                    type="text"
                    placeholder="Company E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>

                <div className="input-container">
                  <img
                    src={password_icon}
                    style={{ height: "25px" }}
                    alt="Password"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
                {action === "Login" ? (
                  <div></div>
                ) : (
                    <p style={{ color: "#797979", fontSize: "14px" }}>
                      *Enter company address as "City, Country Code". e.g. "Izmir, TR"
                    </p>
                )}
              <div className="submit-container">
                <button
                  className={action === "Login" ? "submit gray" : "submit"}
                  onClick={handleAction}
                >
                  <span className="submitspan">Sign Up</span>
                </button>
                <button
                  className={
                    action === "Sign Up as Company" ? "submit gray" : "submit"
                  }
                  onClick={handleAction}
                >
                  <span className="submitspan">Login</span>
                </button>
              </div>

              {showKVKKPopupForCompany && (
                <div className="popup">
                  <h3>Please accept the terms and conditions</h3>
                  <div style={{ textAlign: "left" }}>
                    <input
                      type="checkbox"
                      id="checkbox1"
                      checked={checkbox1}
                      onChange={handleCheckbox1Change}
                    />
                    <label htmlFor="checkbox1">
                      "I agree to the Terms of Service and the Terms of Use."
                    </label>
                  </div>
                  <br />
                  <div style={{ textAlign: "left" }}>
                    <input
                      type="checkbox"
                      id="checkbox2"
                      checked={checkbox2}
                      onChange={handleCheckbox2Change}
                    />
                    <label htmlFor="checkbox2">
                      "I have read and approve the
                      <span
                        onClick={() => setShowKVKKPopupForCompany(true)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {" "}
                        KVKK
                      </span>
                      ."
                    </label>
                  </div>
                  <div className="popup-buttons">
                    <button onClick={handlePopupSubmit}>Confirm</button>
                    <button onClick={() => setShowKVKKPopupForCompany(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {showKVKKPopup && (
                <div className="popup">
                  <h3>KVKK</h3>
                  <div
                    style={{
                      textAlign: "left",
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    In accordance with the Law on the Protection of Personal
                    Data No. 6698 ("KVKK"), we inform you about the purposes of
                    processing your personal data, the legal reasons, the
                    methods of collecting data, and your rights regarding your
                    personal data.
                    <br></br>
                    1. Data Controller<br></br>
                    The data controller is Internship Management System.
                    <br></br>
                    2. Purposes of Data Processing<br></br>
                    Your personal data will be processed for the following
                    purposes: To manage and provide the services of the
                    Internship Management System To communicate with users To
                    improve our services To fulfill legal obligations<br></br>
                    3. Legal Basis for Data Processing<br></br>
                    Your personal data is processed based on the following legal
                    grounds: Your explicit consent The necessity for the
                    performance of a contract Compliance with legal obligations
                    <br></br>
                    4. Methods of Collecting Personal Data<br></br>
                    Your personal data is collected through: Information you
                    provide during registration and use of the system Automatic
                    data collection methods when using our platform<br></br>
                    5. Your Rights<br></br>
                    In accordance with KVKK, you have the following rights: To
                    learn whether your personal data is processed To request
                    information about data processing To request the correction
                    of inaccurate data To request the deletion or destruction of
                    your personal data To object to processing under certain
                    conditions<br></br>
                    <br></br>
                    By accepting this notice, you acknowledge that you have
                    read, understood, and consent to the processing of your
                    personal data as described above.
                  </div>
                  <div className="popup-buttons">
                    <button onClick={() => setShowKVKKPopupForCompany(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div>
            <div className="header">
              <div className="loginTitle">Login</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <div className="input-container">
                  <img
                    src={email_icon}
                    style={{ height: "25px" }}
                    alt="Email"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="input-container">
                  <img
                    src={password_icon}
                    style={{ height: "25px" }}
                    alt="Password"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <div
                className="submit-container"
                style={{ justifyContent: "flex-end" }}
              >
                <button className="submit" onClick={() => setAction("Login")}>
                  <span className="submitspan">Login</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
