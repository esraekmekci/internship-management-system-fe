import React from 'react';
import './App.css'
import { UserProvider } from './Components/UserContext';
import LoginSignup from './Pages/LoginSignup'


function App() {
  return (
    <UserProvider>
      <LoginSignup/>
    </UserProvider>
  );
}

export default App;
