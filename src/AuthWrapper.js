import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import App from "./App";
import CoordinatorHomeV2 from "./PagesV2/Coordinator/CoordinatorHomeV2";
import CompanyHomeV2 from "./PagesV2/Company/CompanyHomeV2";
import SecretaryHome from "./PagesV2/Secretary/SecretaryHome";
import Home from "./PagesV2/Student/HomeV2";

const AuthWrapper = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('tokenKey');
  const role = localStorage.getItem('role');

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
          return <App />;
      }
    } else {
        return <App />;
    }
  }, [navigate, token, role]); // token veya role değişirse bu useEffect tetiklenecek
};

export default AuthWrapper;
