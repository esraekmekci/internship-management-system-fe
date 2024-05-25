import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import App from "./App";

const AuthWrapper = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('tokenKey');
  const role = localStorage.getItem('role');
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    if (token) {
      switch (role) {
        case 'STUDENT':
          navigate("/std");
          break;
        case 'COORDINATOR':
          navigate("/coor");
          break;
        case 'COMPANY':
          navigate("/comp");
          break;
        case 'SECRETARY':
          navigate("/sec");
          break;
        default:
          return setCurrentComponent(<App />);
      }
    } else {
        return setCurrentComponent(<App />);
    }
  }, [navigate, token, role]); // token veya role değişirse bu useEffect tetiklenecek

  return currentComponent;
};

export default AuthWrapper;
