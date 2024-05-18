import React, { useState } from 'react';
import './CoordinatorCompanies.css';
import CoordinatorHome from './CoordinatorHome';

/*
Coordinator grades yerine konuldu
Corrdinator gradesi hala silmedim belki ilerde ihtiyaç olabilir diye
*/

const initialCompanies = [
  {
    name: 'Company A',
    address: '123 A Street',
    foundationYear: '2000',
    employeeSize: '100',
    repName: 'John Doe',
    email: 'contactA@company.com',
  },
  {
    name: 'Company B',
    address: '456 B Avenue',
    foundationYear: '2005',
    employeeSize: '200',
    repName: 'Jane Smith',
    email: 'contactB@company.com',
  },
  {
    name: 'Company C',
    address: '789 C Boulevard',
    foundationYear: '2010',
    employeeSize: '300',
    repName: 'Jim Brown',
    email: 'contactC@company.com',
  },
];

function CoordinatorCompanies() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [visibleCompany, setVisibleCompany] = useState(null);

  const toggleCompanyDetails = (index) => {
    setVisibleCompany(visibleCompany === index ? null : index);
  };

  const handleApprove = (index) => {
    alert(`Approved ${companies[index].name}`);
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const handleReject = (index) => {
    alert(`Rejected ${companies[index].name}`);
    setCompanies(companies.filter((_, i) => i !== index));
  };

  return (
    <CoordinatorHome>
      <div className="company-list">
        {companies.map((company, index) => (
          <div key={index} className="company-item">
            <h3>{company.name}</h3>
            <button onClick={() => toggleCompanyDetails(index)}>
              {visibleCompany === index ? 'Hide' : 'View'}
            </button>
            {visibleCompany === index && (
              <div className="company-details">
                <p><strong>Address:</strong> {company.address}</p>
                <p><strong>Foundation Year:</strong> {company.foundationYear}</p>
                <p><strong>Employee Size:</strong> {company.employeeSize}</p>
                <p><strong>Representative Name:</strong> {company.repName}</p>
                <p><strong>Email:</strong> {company.email}</p>
                <div className="action-buttons">
                  <button className="approve-button" onClick={() => handleApprove(index)}>Approve Company</button>
                  <button className="reject-button" onClick={() => handleReject(index)}>Reject</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </CoordinatorHome>
  );
}

export default CoordinatorCompanies;
