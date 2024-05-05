import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from'./Home.js';

function Templates() {
    const downloadFile = (fileName) => {
        // Burada dosyayı indirmek için uygun bir işlem yapılabilir.
        alert(`Downloading file: ${fileName}`);
    };


  
  return (
    <Home>
      <div style={{marginTop:'50px'}}>
      <div className="announcement-section">
        <div className="title">Summer Practice Application Letter (TR)
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Application Letter (EN)
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Application Form (TR)
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Application Form (EN)
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Company Form (TR)
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Report Template (TR)
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Student Questionnaire (EN)
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Student Questionnaire (TR)
        <button className="download-button"  onClick={() => downloadFile('ApplicationLetter.pdf')}>Download</button></div>
      </div>
      </div>
    </Home>
  );
}

export default Templates;