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
const roles = ["COORDINATOR", "STUDENT", "COMPANY", "SECRETARY"];

const LoginSignup = () => {
    localStorage.clear();
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState("COORDINATOR");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [compName, setCompName] = useState("");
    const [compAddress, setCompAddress] = useState("");
    const [foundationYear, setFoundationYear] = useState("");
    const [employeeSize, setEmployeeSize] = useState("");
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
        const path = isLogin ? "login" : "register";
        sendRequest(path);
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
    const sendRequest = (path) => {
        console.log("Sending request to", path);
        PostWithoutAuth(("/auth/"+ path), {
            email : email, 
            password : password,
            role : role
          })
          .then((res) => res.json())
          .then((result) => {
            if (result.token) {
                localStorage.setItem("tokenKey", result.token);
                if (result.authorities.includes("STUDENT")) {
                    alert(`${path} as a ${role} with email: ${email}`);
                    navigate("/home"); 
                } 
                else if (result.authorities.includes("SECRETARY")){
                    //history.push("/home"); 
                }
            }
        })
        .catch((err) => {
            console.log(err)
            console.log("User not found");
            alert(`Wrong student ID / password. Try again.`);
        })
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
                                <img src={studentID} style={{height:'20x'}}  alt="Student ID" />
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
                                <button class="submit" onClick={()=>(setAction("Login"))} >
                                    <span class="submitspan">Login</span>
                                </button>
                            </div>
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
                                        <img src={employees_icon} style={{height:'25px'}} alt="Employee Size" />
                                        <input
                                            type="text"
                                            placeholder="Employee Size"
                                            value={employeeSize}
                                            onChange={handleEmployeeSizeChange}
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
                                    <button class={action === "Login"?"submit gray":"submit"} onClick={()=>(setAction("Sign Up as Company"))}><span class="submitspan">Sign Up</span></button>
                                    <button class={action === "Sign Up as Company"?"submit gray":"submit"} onClick={()=>(setAction("Login"))}><span class="submitspan">Login</span></button>
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
                            <button class="submit" onClick={()=>(setAction("Login"))}>
                                <span class="submitspan">Login</span>
                            </button>
                        </div>
                    </form>
                </div>}
            </div>
        </div>
    );
}

export default LoginSignup;
