import React, { useState, useEffect } from "react";
import { GetWithAuth } from "../../Services/HttpService.js";
import "../../Pages/Applications.css";
import { useUser } from "../../Components/UserContext";

export default function ApplicationsV2() {
  const [applications, setApplications] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Select file");
  const { user } = useUser();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await GetWithAuth(
          "/student/" + user.studentID + "/appliedcompanies"
        );
        const result = await response.json();
        setApplications(result);
      } catch (error) {
        console.log(error);
        console.log("application not found");
      }
    };

    fetchCompanies();
  }, []);

  const handleClick = (company) => {
    if (selectedCompany === company) {
      setSelectedCompany(null); // Aynı şirkete tekrar tıklandığında kapat
    } else {
      setSelectedCompany(company);
    }
  };

  const downloadDocument = (type) => {
    fetch(
      "/student/" +
        user.studentID +
        "/downloadApplication" +
        type +
        "?companyName=" +
        selectedCompany.companyName,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.blob(); // Yanıtı blob olarak al
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Blob'dan bir URL oluştur
        const a = document.createElement("a"); // Yeni bir anchor elementi oluştur
        a.href = url;
        a.download =
          "Application" + type + "_" + selectedCompany.companyName + ".docx"; // İndirilecek dosyanın adını belirle
        document.body.appendChild(a); // Anchor elementini document'e ekle
        a.click(); // Programatik olarak tıklayarak indirme işlemini başlat
        a.remove(); // Anchor elementini temizle
        window.URL.revokeObjectURL(url); // Oluşturulan URL'i iptal et
        alert(`Application ${type} downloaded successfully`);
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert(`Application ${type} download is unsuccessful`);
      });
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
      alert("Please select a file first!");
      return;
    }

    if (
      !(
        fileName.endsWith(".docx") ||
        fileName.endsWith(".doc") 
      )
    ) {
      alert("Please select a word file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("companyName", selectedCompany.companyName);

    uploadApplicationForm(formData);

    console.log("Sending request to upload application form");
  };

  const uploadApplicationForm = (formData) => {
    fetch("/student/" + user.studentID + "/uploadApplicationForm", {
      method: "POST",
      body: formData,
      headers: {
        // Don't set 'Content-Type': 'multipart/form-data',
        // Fetch will set it automatically along with the boundary
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response;
      })
      .then((result) => {
        alert("Application form uploaded successfully");
        setFile(null);
        setFileName("Select file");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert("Application form upload is unsuccessful.");
      });
  };

  return (
    <div className="w-full-padding">
      <div className="" style={{ borderBottom: "1px solid #ccc" }}>
        <h1>Applications</h1>
      </div>

      <div>
        {applications.map((application, index) => (
          <div key={index} className="announcement-section" style={{borderBottom: "1px solid #ccc", paddingBottom: "8px"}}>
            <h2
              onClick={() => handleClick(application)}
              style={{ cursor: "pointer" }}
            >
              {application.companyName}
              <span style={{ float: "right", fontSize: "15px" }}>
                Status: {application.applicationStatus}
              </span>
            </h2>
            {selectedCompany === application && (
              <div>
                <div>
                  {(application.applicationStatus === "Application Letter Pending" ||
                   application.applicationStatus === "Application Letter Rejected")  && (
                    <button
                      className="button"
                      onClick={() => downloadDocument("Letter")}
                    >
                      Show Application Letter
                    </button>
                  )}
                  {application.applicationStatus ===
                    "Application Letter Approved" && (
                    <div>
                      <button
                        className="button"
                        onClick={() => downloadDocument("Letter")}
                      >
                        Show Application Letter
                      </button>
                      <br />
                      <br />
                      <div>
                      <form onSubmit={handleSubmit}>
                      <label
                        htmlFor="fileInput"
                        className="button iyte-bg"
                        style={{
                          background: "#4CAF50",
                          color: "white",
                          padding: "10px 20px",
                          width: "20%",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        Choose Application Letter
                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: "none" }}
                          accept=".docx, .doc"
                          onChange={handleFileChange}
                        />
                      </label>
                      {fileName && (
                        <span style={{ marginLeft: "10px" }}>{fileName}</span>
                      )}{" "}
                      {/* Dosya adını göster */}
                      <label
                        className="button iyte-bg"
                        style={{
                          display:"flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#4CAF50",
                          color: "white",
                          padding: "10px 20px",
                          width: "4%",
                          cursor: "pointer",
                          borderRadius: "4px",
                          float: "right",
                        }}
                      >
                        Send
                        <input type="submit" style={{ display: "none" }} />
                      </label>
                    </form>
                    <br />
                    <br />
                    </div>
                    </div>
                  )}
                  {(application.applicationStatus === "Application Form Sent to Company" ||
                    application.applicationStatus === "Application Form Sent to Coordinator" ||
                    application.applicationStatus === "Application Form Approved" ||
                    application.applicationStatus === "Application Form Rejected" ||
                    application.applicationStatus === "SGK Document Pending" ||
                    application.applicationStatus === "SGK Document Uploaded"
                    ) && (
                    <div>
                      <button
                        className="button"
                        onClick={() => downloadDocument("Letter")}
                      >
                        Show Application Letter
                      </button>
                      <br />
                      <button
                        className="button"
                        onClick={() => downloadDocument("Form")}
                      >
                        Show Application Form
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
