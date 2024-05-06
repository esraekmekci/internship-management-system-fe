import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from'./Home.js';
import company_icon from '../Components/Assets/company.png';


const companies = [
    { name: 'Company A', status: 'basvuruldu', year:'2020',numOfEmp:'5000',city:'İzmir',contry:'Turkey',type:'Remote' },
    { name: 'Company B', status: 'basvurulmadi' },
    { name: 'Company C', status: 'Application Letter Approved' }
  ];
  
function Companies() {
    const [selectedCompany, setSelectedCompany] = useState(null);
  
    const handleClick = (company) => {
      if (selectedCompany === company) {
        setSelectedCompany(null); // Aynı şirkete tekrar tıklandığında kapat
      } else {
        setSelectedCompany(company);
      }
    };
  
    return (
        <Home>
      <div className="announcement-section" style={{marginTop: '60px'}}>
      <h1>Companies</h1>
      
    </div>

    <div>
    {companies.map((company, index) => (
        <div key={index}  className="announcement-section">
          <h2  onClick={() => handleClick(company)} style={{ cursor: 'pointer' }}>{company.name}<span style={{float:'right', fontSize:'15px'}}>Status: {company.status}</span></h2>
          {selectedCompany === company && (
            <div>
              <div>
              <p>
              <img src={company_icon} alt="Person" className="company" />   {company.city} - {company.contry} ({company.type}) 
              <p style={{float:'right'}}>+{company.numOfEmp} Employee</p>
              
              </p><br/>
              <p style={{float:'right'}}>{company.year}</p>
              <br/>
              
               
               
                </div>
                <br /><br /><br />
              <div>
              {company.status === 'basvurulmadi' && (
                <div>
                        <label htmlFor="fileInput" className="file-upload-button"  style={{ 
                background: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                width: '20%',
                cursor:'pointer',
                borderRadius:'4px'
                }}>
                        Send Application Letter
                        <input type="file" id="fileInput" style={{ display: 'none' }}  />
                      </label>
                  
                </div> 


              )}<br/>
              {company.status === 'basvuruldu' && (
                <button className='button' >Show Application Letter</button>
              )}
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