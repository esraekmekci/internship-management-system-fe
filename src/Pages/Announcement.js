import React, { useState, useEffect } from 'react';
import { GetWithAuth } from "../Services/HttpService.js";
import Home from'./Home.js';
import company_icon from '../Components/Assets/building.png';
import calendar_icon from '../Components/Assets/calendar-day.png';
import employees_icon from '../Components/Assets/employees.png';
import './Companies.css';


function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Select file');
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await GetWithAuth("/student/token/" + localStorage.getItem("tokenKey"));
        const result = await response.json();
        console.log(result);
        setCurrentUser(result);
        await fetchAnnouncements();
      } catch (error) {
        console.log(error);
        console.log("User not found");
      }
    };

      const fetchAnnouncements = async () => {
      try {
          const response = await GetWithAuth("/announcement/approved");
          const result = await response.json();
          console.log(result);
          setAnnouncements(result);
      } catch (error) {
          console.log(error);
          console.log("application not found");
      }
      };

  
      fetchStudent();
 
  }, []);

  const handleClick = (announcement) => {
    if (selectedAnnouncement === announcement) {
      setSelectedAnnouncement(null); 
    } else {
      setSelectedAnnouncement(announcement);
    }
  };
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }
    
    if (!(fileName.endsWith('.docx') || fileName.endsWith('.doc') || fileName.endsWith('.pdf'))) {
      alert('Please select a word/pdf file!');
      return;
    }
  

    const formData = new FormData();
    formData.append('file', file);
    formData.append('companyName', selectedAnnouncement.companyRep.companyName);
  
    uploadApplicationLetter(formData);
  
    console.log("Sending request to upload application letter");
  };

  
  const uploadApplicationLetter = (formData) => {
    fetch("/student/" + currentUser.studentID + "/uploadApplicationLetter", {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set 'Content-Type': 'multipart/form-data',
        // Fetch will set it automatically along with the boundary
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response;
    })
    .then(result => {
      console.log(result);
      alert("Application letter uploaded successfully");
      setFile(null);
      setFileName('Select file');
    })
    .catch(err => {
      console.error("Error occurred:", err);
      alert("You already uploaded an application letter for this company.");
    });
  }

  return (
        <Home>
      <div className="announcement-section" style={{marginTop: '60px'}}>
      <h1>Announcements</h1>
    </div>

    <div>
    {announcements.map((announcement,index) => (
      <div key={index}  className="announcement-section" >
          <h2  onClick={() => handleClick(announcement)} style={{ cursor: 'pointer' }}>{announcement.companyRep.companyName}<span style={{float:'right', fontSize:'15px'}}>Date: {announcement.uploadDate}</span></h2>
          {selectedAnnouncement === announcement && (
            <div>
              <h3>{announcement.title}</h3>
              <div className='info-bar'>
                <div className="info-bar-left">
                  <img src={company_icon} alt="Company" className="user-icon" />
                  {announcement.companyRep.companyAddress} ({announcement.companyRep.internshipType})
                </div>
                <div className="info-bar-right">
                  <p>+{announcement.companyRep.employeeSize} Employees <img src={employees_icon} alt="Company" className="user-icon" />  </p>
                  <p> {announcement.companyRep.foundationYear} <img src={calendar_icon} alt="Company" className="user-icon" />    </p>
                </div>
              </div>
              <p>{announcement.description}</p>
              <br /><br /><br />
              <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="fileInput" className='button' style={{ 
                  background: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  width: '20%',
                  cursor:'pointer',
                  borderRadius:'4px'
                }}>
                  Choose Application Letter
                  <input type="file" id="fileInput" style={{ display: 'none' }} accept=".docx, .doc, .pdf" onChange={handleFileChange} />
                </label>
                {fileName && <span style={{ marginLeft: '10px' }}>{fileName}</span>} {/* Dosya adını göster */}
                <label className='button' style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  width: '4%',
                  cursor:'pointer',
                  borderRadius:'4px',
                  float:'right'
                }}>
                  Send
                  <input type='submit' style={{ display: 'none' }} />
                </label>
              </form>
              <br/>
            </div>
              
            </div>
          )}
        </div>
      ))}
    </div>
      </Home>
  );
}

export default Announcement;