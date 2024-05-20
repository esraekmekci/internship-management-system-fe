import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from'./HomeV2.jsx';
import { GetWithAuth } from '../../Services/HttpService.js';
import { wait } from '@testing-library/user-event/dist/utils/index.js';
import { waitFor } from '@testing-library/react';

export default function TemplatesV2() {
  const downloadFile = (fileName) => {
    const anchor = document.createElement("a");
    anchor.style.display = "none";
    
    const downloadUrl = "http://localhost:8080/api/v1/download/" + fileName;
    
    anchor.href = downloadUrl;
    
    anchor.setAttribute("download", fileName);
    
    document.body.appendChild(anchor);
    
    anchor.click();
    
};


  
  return (
    <Home>
      <div style={{marginTop:'60px'}}>
      <div className="announcement-section">
        <div className="title">Summer Practice Application Letter (TR)
        <button className="download-button"  onClick={() => downloadFile('1_TR_SummerPracticeApplicationLetter2023.docx')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Application Letter (EN)
        <button className="download-button"  onClick={() => downloadFile('1_EN_SummerPracticeApplicationLetter2023.docx')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Application Form (TR)
        <button className="download-button"  onClick={() => downloadFile('2_TR_SummerPracticeApplicationForm2023.doc')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Company Form (TR)
        <button className="download-button"  onClick={() => downloadFile('3_TR_FirmaFormu2023.docx')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Report Template (TR)
        <button className="download-button"  onClick={() => downloadFile('4_SummerPracticeReportTemplate_Word2023.docx')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Student Questionnaire (EN)
        <button className="download-button"  onClick={() => downloadFile('5_EN_SummerPracticeStudentQuestionnaire_Word.docx')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">Summer Practice Student Questionnaire (TR)
        <button className="download-button"  onClick={() => downloadFile('5_TR_StajÖğrenciAnketi_Word2023.docx')}>Download</button></div>
      </div>
      </div>
    </Home>
  );
}