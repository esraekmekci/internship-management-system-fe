import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Home from "./HomeV2.jsx";

export default function ApplyInternshipV2() {
  const [companies, setCompanies] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const fileInputRef = useRef(null);

  // Simulated fetch function
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchCompanies = async () => {
      // Simulating a fetch request
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { id: 1, name: "Company A" },
              { id: 2, name: "Company B" },
              { id: 3, name: "Company C" },
              // add more companies as needed
            ]),
          1000
        )
      );

      setCompanies(response);
    };

    fetchCompanies();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const triggerFileInput = (companyId) => {
    fileInputRef.current.click();
    setSelectedCompanyId(companyId); // Set the company ID when the file input is triggered
  };

  const handleUpload = () => {
    if (selectedFile) {
      setTimeout(() => {
        alert("File uploaded successfully!");
        setSelectedFile(null); // Reset file selection
        setSelectedCompanyId(null); // Reset company ID
      }, 500);
    }
  };

  return (
    <Home>
      <div className="announcement-section" style={{ marginTop: "60px" }}>
        <h3>Companies</h3>
        <div className="companies-list">
          {companies.map((company) => (
            <div key={company.id} className="company-item">
              <div className="company-name">{company.name}</div>
              <div className="company-dropdown">
                <button
                  className="dropdown-button"
                  onClick={() => triggerFileInput(company.id)}
                >
                  Send Application Form
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                {selectedFile && selectedCompanyId === company.id && (
                  <div>
                    <p>File ready to upload: {selectedFile.name}</p>
                    <button className="dropdown-button" onClick={handleUpload}>
                      Upload File
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Home>
  );
}
