import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from'./Home.js';



function Announcement() {
  
  return (
      
    
    <Home>
      <div className="announcement-section">
        <div className="title">Announcements</div>
        <div className="title-underline"></div>
        <div className="text">Currently, there are no announcements.</div>
      </div>
    </Home>
  );
}

export default Announcement;