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
    <div className="announcement-section" style={{marginTop: '50px'}}>
        <ul>
            <li>
                Application Letter
                <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button>
            </li>
            <br />
            <li>
                SGK
                <button className="download-button" onClick={() => downloadFile('SGK.pdf')}>Download</button>
            </li>
        </ul>
    </div>
    </Home>
  );
}

export default Documents;