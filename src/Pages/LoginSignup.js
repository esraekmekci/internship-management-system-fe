import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import { PostWithoutAuth } from "../Services/HttpService";
import email_icon from '../Components/Assets/email-icon.png';
import password_icon from '../Components/Assets/padlock.png';
import employees_icon from '../Components/Assets/employees.png';
import company_icon from '../Components/Assets/building.png';
import calendar_icon from '../Components/Assets/calendar-day.png';
import companyAddress from '../Components/Assets/location.png';
import iyte_icon from '../Components/Assets/iyte-logo.png';
import studentID from '../Components/Assets/id-card.png';
import internTypeIcon from '../Components/Assets/online-work.png';
import representative_icon from '../Components/Assets/employee-man.png';

const roles = ["COORDINATOR", "STUDENT", "COMPANY", "SECRETARY"];

const LoginSignup = () => {
    localStorage.clear();
    const [role, setRole] = useState("COORDINATOR");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [compName, setCompName] = useState("");
    const [compRepName, setCompRepName] = useState("");
    const [compAddress, setCompAddress] = useState("");
    const [foundationYear, setFoundationYear] = useState("");
    const [employeeSize, setEmployeeSize] = useState("");
    const [internshipType, setInternshipType] = useState("");
    

    const [showCheckboxPopup , setShowCheckboxPopup ] = useState(false);
    const [showKVKKPopup , setShowKVKKPopup  ] = useState(false);
    const [showPopupForStudent, setShowPopupForStudent] = useState(localStorage.getItem('showPopupForStudent') !== 'false');
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);

    const [stID, setStudentID] = useState("");
    const [action,setAction] = useState("Sign Up as Company");
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (role === "COMPANY" && action === "Sign Up as Company"){
            registerAsCompany();
        }
        else if (role === "STUDENT"){
            if (showPopupForStudent) {
                setShowCheckboxPopup(true);
            }
            else{
                login();
            }
        }
        else{
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
    
    const login = () => {
        PostWithoutAuth(("/auth/login"), {
            email : role === "STUDENT" ? stID : email, 
            password : password,
            role : role
          })
          .then((res) => res.json())
          .then((res) => {
            if (res.token) {
                localStorage.setItem("tokenKey", res.token);
                if (res.authorities.includes("STUDENT")) {
                    alert(`Logging in as a ${role} with student ID: ${stID}`);
                    navigate("/home"); 
                } 
                else if (res.authorities.includes("SECRETARY")){
                    alert(`Logging in as a ${role} with email: ${email}`);
                    navigate("/sec_home"); 
                }
                else if (res.authorities.includes("COORDINATOR")){
                    alert(`Logging in as a ${role} with email: ${email}`);
                    navigate("/coor_home"); 
                }
                else if (res.authorities.includes("COMPANY")){
                    alert(`Logging in as a ${role} with email: ${email}`);
                    navigate("/comp-home"); 
                }
            }
        })
        .catch((err) => {
            console.log(err)
            console.log("User not found");
            if (role === "STUDENT") {
                alert(`Wrong student ID or password. Try again.`);
            }
            else {
                alert(`Wrong email or password. Try again.`);
            }
        })
    }
    const handleCheckbox1Change = (event) => {
        setCheckbox1(event.target.checked);
    };

    const handleCheckbox2Change = (event) =>{
        setCheckbox2(event.target.checked);
    };

    const handlePopupSubmit = () => {
        if (checkbox1 && checkbox2) {
            localStorage.setItem('showPopupForStudent', 'false');
            setShowCheckboxPopup(false);
            login();
        } else {
            alert('Please check both checkboxes before proceeding.');
        }
    };

    const registerAsCompany = () => {
        PostWithoutAuth(("/auth/register"), {
            compName : compName,
            compAddress : compAddress,
            foundationYear : foundationYear,
            empSize : employeeSize,
            name : compRepName,
            email : email, 
            password : password,
            role : role
          })
          .then((res) => res.json())
          .then((res) => {
            if (res.token) {
                localStorage.setItem("tokenKey", res.token);
                alert(`Logging in as a ${role} with ${email}`);
                if (res.authorities.includes("STUDENT")) {
                    navigate("/home"); 
                } 
                else if (res.authorities.includes("SECRETARY")){
                    navigate("/sec_home"); 
                }
                else if (res.authorities.includes("COORDINATOR")){
                    navigate("/coor_home"); 
                }
                else if (res.authorities.includes("COMPANY")){
                    navigate("/comp-home"); 
                }
            }
        })
        .catch((err) => {
            console.log(err)
            console.log("User not found");
            alert(`Registration failed. Try again.`);
        })
    }

    const handleAction = (event) => {
        if (action === "Login" && event.target.innerText === "Sign Up") {
            setAction("Sign Up as Company");
        } else if (action === "Sign Up as Company" && event.target.innerText === "Login") {
            setAction("Login");
        }
        setEmail("");
        setPassword("");
    }


    return (
        <div className="login-signup-container">
            <div className="top-bar">
            <img src={iyte_icon} alt="" className="iyte-logo" /><b>IZTECH IMS</b>
            <div className="top-bar-container" style={{ right: '0',marginLeft:'auto'}}>
                {roles.map((r) => (
                    <button key={r} className={role === r ? "active" : ""} onClick={() => setRole(r)}  >
                        {r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()}
                    </button>
                ))}
                </div>
            </div>
            <div className="form-container">
                {role === "STUDENT" ? 
                        <div>
                        <div className="header">
                            <div className="loginTitle">Login with UBYS</div>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div className="inputs" >
                            <div className="input-container">
                                <img src={studentID} style={{height:'25px'}}  alt="Student ID" />
                                <input
                                    type="text"
                                    placeholder="Student ID"
                                    value={stID}
                                    onChange={handleStudentIDChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <img src={password_icon} style={{height:'25px'}} alt="Password" />
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
                                <p style={{color:'#797979', fontSize:'14px'}}>*Please enter your UBYS credentials.</p>
                            </div>
                            <div className="submit-container" style={{justifyContent:'flex-end'}}>
                                <button className="submit" onClick={()=>(setAction("Login"))} >
                                    <span className="submitspan">Login</span>
                                </button>
                            </div>
                            {showCheckboxPopup && (
                            <div className="popup">
                                <h3>Please accept the terms and conditions</h3>
                                <div style={{ textAlign: 'left' }}>
                                    <input
                                        type="checkbox"
                                        id="checkbox1"
                                        checked={checkbox1}
                                        onChange={handleCheckbox1Change}
                                    />
                                    <label htmlFor="checkbox1">I agree to transfer my UBYS information to the Internship Management System.</label>
                                </div>
                                <br />
                                <div style={{ textAlign: 'left' }}>
                                    <input
                                        type="checkbox"
                                        id="checkbox2"
                                        checked={checkbox2}
                                        onChange={handleCheckbox2Change}
                                    />
                                    <label htmlFor="checkbox2">I have read and approve the 
                                        <span onClick={() => setShowKVKKPopup(true)} style={{ color: 'blue', cursor: 'pointer' }}> KVKK</span>
                                    .</label>
                                </div>
                                <div className="popup-buttons">
                                    <button onClick={handlePopupSubmit}>Confirm</button>
                                    <button onClick={() => setShowCheckboxPopup(false)}>Cancel</button>
                                </div>
                            </div>
                        )}

                        {showKVKKPopup && (
                            <div className="popup">
                                <h3>KVKK</h3>
                                <div style={{ textAlign: 'left', maxHeight: '200px', overflowY: 'auto' }}>
                                    KVKK metni buraya gelecek.
                                    KVKK metni buraya gelecek.
                                    ssıkıcı yazılar falan.
                                    KVKK metni buraya gelecek.
                                    KVKK metni buraya gelecek.3131313131 
                                    KVKK metni buraya gelecek.KVKK metni buraya gelecek.KVKK metni buraya gelecek.KVKK metni buraya gelecek.
                                    KVKK metni buraya gelecek.KVKK metni buraya gelecek.KVKK metni buraya gelecek.KVKK metni buraya gelecek.
                                    KVKK metni buraya gelecek.KVKK metni buraya gelecek.KVKK metni buraya gelecek.
                                    KVKK metni buraya gelecek.KVKK metni buraya gelecek.KVKK metni buraya gelecek.
                                </div>
                                <div className="popup-buttons">
                                    <button onClick={() => setShowKVKKPopup(false)}>Kapat</button>
                                </div>
                            </div>
                        )}


                            
                        </form>
                    </div> 
                    : role === "COMPANY" ? (
                        <div>
                            <div className="header">
                                <div className="loginTitle">{action}</div>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className="inputs" >



                                {action==="Login"? <div></div>: 
                                <div>
                                
                                    <div className="input-container">
                                    <img src={company_icon} style={{height:'25px'}} alt="Company Name" />
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        value={compName}
                                        onChange={handleCompNameChange}
                                        required
                                    />
                                    </div>
                                    <div className="input-container">
                                        <img src={companyAddress} style={{height:'25px'}} alt="Company Address" />
                                        <input
                                            type="text"
                                            placeholder="Company Address"
                                            value={compAddress}
                                            onChange={handleCompAddressChange}
                                            required
                                        />
                                        
                                    </div>
                                    <div className="input-container">
                                        <img src={calendar_icon} style={{height:'25px'}} alt="Foundation Year" />
                                        <input 
                                            type="text"
                                            placeholder="Foundation Year"
                                            value={foundationYear}
                                            onChange={handleFoundationYearChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-container">
                                        <img src={internTypeIcon} style={{height:'28px'}} alt="Internship Type" />
                                        <select className="selectInternshipType" required defaultValue="">
                                            <option value="" onChange={handleInternshipTypeChange}>Internship Type</option>
                                            <option value={internshipType} onChange={handleInternshipTypeChange}>Hybrid</option>
                                            <option value={internshipType} onChange={handleInternshipTypeChange}>Remote</option>
                                            <option value={internshipType} onChange={handleInternshipTypeChange}>On-Site</option>
                                        </select>
                                    </div>
                                    
                                    <div className="input-container">
                                        <img src={employees_icon} style={{height:'25px'}} alt="Employee Size" />
                                        <input
                                            type="text"
                                            placeholder="Employee Size"
                                            value={employeeSize}
                                            onChange={handleEmployeeSizeChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-container">
                                        <img src={representative_icon} style={{height:'25px'}} alt="Representative Name" />
                                        <input
                                            type="text"
                                            placeholder="Representative Name"
                                            value={compRepName}
                                            onChange={handleCompRepNameChange}
                                            required
                                        />
                                    </div>
                                    
                                </div>
                                }


                                    <div className="input-container">
                                        <img src={email_icon} style={{height:'25px'}} alt="Company email" />
                                        <input
                                            type="text"
                                            placeholder="Company E-mail"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                        />
                                    </div>
                                    
                                    
                                    
                                    <div className="input-container">
                                        <img src={password_icon} style={{height:'25px'}} alt="Password" />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="submit-container">
                                    <button className={action === "Login"?"submit gray":"submit"} onClick={handleAction}><span class="submitspan">Sign Up</span></button>
                                    <button className={action === "Sign Up as Company"?"submit gray":"submit"} onClick={handleAction}><span class="submitspan">Login</span></button>
                                </div>
                            </form>
                        </div>
                      ) :
                    <div>
                        <div className="header">
                            <div className="loginTitle">Login</div>
                        </div>
                    <form onSubmit={handleSubmit}>
                        <div className="inputs" >
                        <div className="input-container">
                            <img src={email_icon} style={{height:'25px'}} alt="Email" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <img src={password_icon} style={{height:'25px'}} alt="Password" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        </div>
                        <div className="submit-container" style={{justifyContent:'flex-end'}}>
                            <button className="submit" onClick={()=>(setAction("Login"))}>
                                <span className="submitspan">Login</span>
                            </button>
                        </div>
                    </form>
                </div>}
            </div>
        </div>
    );
}

export default LoginSignup;
