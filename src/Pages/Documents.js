import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from'./Home.js';

function Documents() {
    const downloadFile = (fileName) => {
        // Burada dosyayı indirmek için uygun bir işlem yapılabilir.
        alert(`Downloading file: ${fileName}`);
    };

  
  return (
      
    
    <Home>
    <div className="announcement-section" style={{marginTop: '60px'}}>
    
        <div className="title">Summer Practice Application Letter (TR)
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">SGK
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      
    </div>
    </Home>
  );
}

export default Documents;