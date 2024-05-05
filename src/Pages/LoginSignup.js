import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './LoginSignup.css';
import { PostWithoutAuth } from "../Services/HttpService";
import email_icon from '../Components/Assets/email.png';
import password_icon from '../Components/Assets/password.png';

const roles = ["Student", "Company", "Secretary", "Coordinator"];

const LoginSignup = () => {
    localStorage.clear();
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState("Student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

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
                    navigate("/home"); 
                    alert(`${path} as a ${role} with email: ${email}`);
                } 
                else if (result.authorities.includes("SECRETARY")){
                    //history.push("/home"); 
                }
            }
        })
        .catch((err) => {
            console.log(err)
            console.log("User not found");
            alert(`${path} as a ${role} is unsuccessful`);
        })
    }
    return (
        <div className="login-signup-container">
            <div className="top-bar">
                {roles.map((r) => (
                    <button key={r} className={role === r ? "active" : ""} onClick={() => setRole(r)}>
                        {r}
                    </button>
                ))}
            </div>
            <div className="form-container">
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
            </div>
        </div>
    );
}

export default LoginSignup;
