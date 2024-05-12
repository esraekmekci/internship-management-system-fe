import React, { useState, useEffect } from 'react';
import { GetWithAuth } from "../Services/HttpService";
import Home from'./Home.js';
import company_icon from '../Components/Assets/building.png';
import calendar_icon from '../Components/Assets/calendar-day.png';
import employees_icon from '../Components/Assets/employees.png';
import './Companies.css';

  
function Companies() {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('Select file');
    const [currentUser, setCurrentUser] = useState({});
    // const studentId = 280201050;

    useEffect(() => {
      console.log(currentUser.studentID); // currentUser her güncellendiğinde bu çalışır
    }, [currentUser]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await GetWithAuth("/student/token/" + localStorage.getItem("tokenKey"));
          const result = await response.json();
          console.log(result);
          setCurrentUser(result);
        } catch (error) {
          console.log(error);
          console.log("User not found");
        }
      };
      
      
      const timeout = setTimeout(() => {
        fetchData();
      }, 10); 
      
      
      return () => clearTimeout(timeout); 
      
    }, []);

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      }
    };
  
    const handleSubmit = (event) => {
      console.log("Sending request to upload application letter");
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
      formData.append('companyName', selectedCompany.companyName);
      
      uploadApplicationLetter(formData);


      console.log("Sending request to upload application letter");

      };
  
    const handleClick = (company) => {
      if (selectedCompany === company) {
        setSelectedCompany(null); 
      } else {
        setSelectedCompany(company);
      }
      setFile(null);
      setFileName('Select file');
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
        alert("Application letter upload is unsuccessful");
      });
    }
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await GetWithAuth("/company");
              const result = await response.json();
              console.log(result);
              setCompanies(result);
              companies.map((company) => {
                  console.log(company.companyName);
              });
          } catch (error) {
              console.log(error);
              console.log("comp not found");
          }
      };
  
      const timeout = setTimeout(() => {
          fetchData();
      }, 1);
  
      return () => clearTimeout(timeout);
  
  }, []);

    return (
        <Home>
      <div className="announcement-section" style={{marginTop: '60px'}}>
      <h1>Companies</h1>
      
    </div>

    <div>
    {companies.map((company,index) => (
      <div key={index}  className="announcement-section">
          <h2  onClick={() => handleClick(company)} style={{ cursor: 'pointer' }}>{company.companyName}<span style={{float:'right', fontSize:'15px'}}>Representative: {company.name}</span></h2>
          {selectedCompany === company && (
            <div>
              <div className='info-bar'>
                <div className="info-bar-left">
                  <img src={company_icon} alt="Company" className="user-icon" />
                  {company.companyAddress} ({company.internshipType})
                </div>
                <div className="info-bar-right">
                  <p>+{company.employeeSize} Employees <img src={employees_icon} alt="Company" className="user-icon" />  </p>
                  <p> {company.foundationYear} <img src={calendar_icon} alt="Company" className="user-icon" />    </p>
                </div>
              </div>
              <br /><br /><br />
              <div>
              {/* <div>
                <label htmlFor="fileInput" className='button'
                style={{ 
                background: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                width: '20%',
                cursor:'pointer',
                borderRadius:'4px'
                }}
                >
                  Choose Application Letter
                  <input type="file" id="fileInput" style={{ display: 'none' }} accept=".docx, .doc" onInput={handleFileChange} />
                </label>
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
                  <input type='submit' style={{ display: 'none' }} onClick={handleSubmit} />
                </label>

                <label for="avatar">Choose a profile picture:</label>

                <input type="file" id="avatar" name="avatar"  accept="image/png, image/jpeg" />

              </div>  */}

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

export default Companies;