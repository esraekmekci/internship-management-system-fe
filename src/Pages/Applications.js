import React, { useState, useEffect } from 'react';
import { GetWithAuth } from "../Services/HttpService.js";
import Home from'./Home.js';
import { wait } from '@testing-library/user-event/dist/utils/index.js';


  
function Applications() {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
        
    useEffect(() => {
      const fetchStudent = async () => {
        try {
          const response = await GetWithAuth("/student/token/" + localStorage.getItem("tokenKey"));
          const result = await response.json();
          console.log(result);
          setCurrentUser(result);
          await fetchCompanies(result);
        } catch (error) {
          console.log(error);
          console.log("User not found");
        }
      };
      
      const fetchCompanies = async (user) => {
        try {
            const response = await GetWithAuth("/student/" + user.studentID + "/appliedcompanies");
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

    
    fetchStudent();
   
      
    }, []);
  
    const handleClick = (company) => {
      if (selectedCompany === company) {
        setSelectedCompany(null); // Aynı şirkete tekrar tıklandığında kapat
      } else {
        setSelectedCompany(company);
      }
    };

    const downloadApplicationLetter = () => {
      fetch("/student/" + currentUser.studentID + "/downloadApplicationLetter?companyName=" + selectedCompany.companyName, {
        method: 'GET',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.blob(); // Yanıtı blob olarak al
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob); // Blob'dan bir URL oluştur
        const a = document.createElement('a'); // Yeni bir anchor elementi oluştur
        a.href = url;
        a.download = "ApplicationLetter_" + selectedCompany.companyName + ".docx"; // İndirilecek dosyanın adını belirle
        document.body.appendChild(a); // Anchor elementini document'e ekle
        a.click(); // Programatik olarak tıklayarak indirme işlemini başlat
        a.remove(); // Anchor elementini temizle
        window.URL.revokeObjectURL(url); // Oluşturulan URL'i iptal et
        alert("Application letter downloaded successfully");
      })
      .catch(err => {
        console.error("Error occurred:", err);
        alert("Application letter download is unsuccessful");
      });
    }
    

  
    return (
        <Home>
          <div className="announcement-section" style={{marginTop: '60px'}}>
            <h1>Applications</h1>
          </div>

    <div>
    {companies.map((company, index) => (
        <div key={index}  className="announcement-section">
          <h2 onClick={() => handleClick(company)} style={{ cursor: 'pointer' }}>{company.companyName}<span style={{float:'right', fontSize:'15px'}}>Status: {company.name}</span></h2>
          {selectedCompany === company && (
            <div>
              <div>
                <button className='button' onClick={downloadApplicationLetter}>Show Application Letter</button>
                  <br /><br />
                <button className='button'>Send Application Form</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
      </Home>
    );
  }

export default Applications;