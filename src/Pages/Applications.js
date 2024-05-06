import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from'./Home.js';



const companies = [
    { name: 'Company A', status: 'Application Letter Approved' },
    { name: 'Company B', status: 'Application Letter Pending' },
    { name: 'Company C', status: 'Application Letter Approved' }
  ];
  
function Applications() {
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
      <h1>Applications</h1>
      
    </div>

    <div>
    {companies.map((company, index) => (
        <div key={index}  className="announcement-section">
          <h2 onClick={() => handleClick(company)} style={{ cursor: 'pointer' }}>{company.name}<span style={{float:'right', fontSize:'15px'}}>Status: {company.status}</span></h2>
          {selectedCompany === company && (
            <div>
              
              {company.status === 'Application Letter Approved' && (
                <div>
                  <button className='button'>Show Application Letter</button>
                    <br /><br />
                  <button className='button'>Send Application Form</button>
                </div>
              )}
              {company.status === 'Application Letter Pending' && (
                <button className='button'>Show Application Letter</button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
      </Home>
    );
  }

export default Applications;