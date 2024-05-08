import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import { PostWithoutAuth } from "../Services/HttpService";
import email_icon from '../Components/Assets/email.png';
import password_icon from '../Components/Assets/password.png';

const roles = ["COORDINATOR", "STUDENT", "COMPANY", "SECRETARY"];

const LoginSignup = () => {
    localStorage.clear();
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState("COORDINATOR");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                {roles.map((r) => (
                    <button key={r} className={role === r ? "active" : ""} onClick={() => setRole(r)}>
                        {r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>
            <div className="form-container">
                {role === "STUDENT" ? 
                        <div>
                        <h2>Login with UBYS</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-container">
                                <img src={email_icon} alt="Student ID" />
                                <input
                                    type="text"
                                    placeholder="Student ID"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <img src={password_icon} alt="Password" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="submit" >Login</button>
                            </div>
                            <div className="login-note">
                                <p>Please enter your UBYS credentials.</p>
                            </div>
                        </form>
                    </div> 
                    : 
                    <div>
                    <h2>{isLogin ? "Login" : "Signup"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <img src={email_icon} alt="Email" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <img src={password_icon} alt="Password" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Switch to Signup" : "Switch to Login"}
                            </button>
                            <button type="submit">{isLogin ? "Login" : "Signup"}</button>
                        </div>
                    </form>
                </div>}
            </div>
        </div>
    );
}

export default LoginSignup;
