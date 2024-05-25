import React from "react";
import App from "./App";
import CoordinatorHomeV2 from "./PagesV2/Coordinator/CoordinatorHomeV2";
import CompanyHomeV2 from "./PagesV2/Company/CompanyHomeV2";
import SecretaryHome from "./PagesV2/Secretary/SecretaryHome";
import Home from "./PagesV2/Student/HomeV2";

const AuthWrapper = () => {
  const token = localStorage.getItem('tokenKey');
  const role = localStorage.getItem('role');

  if (!token) {
    return <App />;
  }

  switch (role) {
    case 'STUDENT':
      return <Home />;
    case 'COORDINATOR':
      return <CoordinatorHomeV2 />;
    case 'COMPANY':
      return <CompanyHomeV2 />;
    case 'SECRETARY':
      return <SecretaryHome />;
    default:
      return <App />; // Eğer role bilinmiyorsa veya hiçbiri değilse, App bileşenine yönlendir.
  }
};

export default AuthWrapper;