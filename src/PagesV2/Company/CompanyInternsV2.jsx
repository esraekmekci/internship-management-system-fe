import React, { useState, useEffect } from "react";
import { GetWithAuth } from "../../Services/HttpService";
import "../../Pages/Company/CompanyInterns.css";
import { useUser } from "../../Components/UserContext.jsx";

function CompanyInternsV2() {
  const { user } = useUser();
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("Select file");

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await GetWithAuth(
          "/company/" + user.companyid + "/interns"
        );
        const result = await response.json();
        setInterns(result);
      } catch (error) {
        console.log(error);
        console.log("application not found");
      }
    };

    fetchInterns();
  }, []);

  const handleSelectIntern = (intern) => {
    if (selectedIntern === intern && !uploading) {
      setSelectedIntern(null);
    } else {
      setSelectedIntern(intern);
    }
  };

  const handleUploadClick = (e) => {
    e.stopPropagation(); // Prevents the onClick event of the parent div from being triggered
    setUploading(!uploading); // Toggle uploading state based on current state
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const downloadForm = () => {
    downloadApplicationForm();
  };

  const handleSubmitUpload = (e) => {
    e.stopPropagation();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    if (!(fileName.endsWith(".docx") || fileName.endsWith(".doc"))) {
      alert("Please select a word file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    uploadApplicationForm(formData);
    setUploading(false);
    setSelectedFile(null);
  };

  const handleCancelUpload = (e) => {
    e.stopPropagation();
    setUploading(false);
    setSelectedFile(null);
  };

  const downloadApplicationForm = () => {
    GetWithAuth(
      "/company/" +
        user.companyid +
        "/downloadApplicationForm?studentId=" +
        selectedIntern.studentId
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
        a.download = "ApplicationForm_" + selectedIntern.studentId + ".docx"; // İndirilecek dosyanın adını belirle
        document.body.appendChild(a); // Anchor elementini document'e ekle
        a.click(); // Programatik olarak tıklayarak indirme işlemini başlat
        a.remove(); // Anchor elementini temizle
        window.URL.revokeObjectURL(url); // Oluşturulan URL'i iptal et
        alert(`Application Form downloaded successfully`);
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert(`Application Form download is unsuccessful`);
      });
  };

  const uploadApplicationForm = (formData) => {
    fetch(
      "/company/" +
        user.companyid +
        "/uploadApplicationForm?studentId=" +
        selectedIntern.studentId,
      {
        method: "POST",
        body: formData,
        headers: {
          // Don't set 'Content-Type': 'multipart/form-data',
          // Fetch will set it automatically along with the boundary
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response;
      })
      .then((result) => {
        console.log(result);
        alert("Application form uploaded successfully");
        setSelectedFile(null);
        setFileName("Select file");
        setUploading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert("Application form upload is unsuccessful.");
      });
  };

  return (
    <div style={{ width: "100%", padding: "20px 40px" }}>
      <div className="" style={{}}>
        <h1 style={{ paddingBottom: "20px", borderBottom: "1px solid #ccc" }}>
          My Interns
        </h1>
      </div>
      {interns.length > 0 ? (
        interns.map((intern) => (
          <div
            key={intern.studentId}
            className=""
            onClick={() => handleSelectIntern(intern)}
          >
            <h2 style={{ color: "rgb(30 41 59)", cursor: "pointer" }}>
              {intern.studentName}
              <span style={{ float: "right", fontSize: "15px" }}>
                Status: {intern.applicationStatus}
              </span>
            </h2>
            {selectedIntern === intern && (
              <div style={{ display: "flex" }}>
                <button className="iyte-bg" onClick={downloadForm}>
                  Download Form
                </button>
                <br />
                <div>
                  <button onClick={handleUploadClick}>Upload Form</button>
                  {uploading && (
                    <div className="modal">
                      <form
                        onSubmit={handleSubmitUpload}
                        style={{
                          display: "flex",
                          padding: "20px 15px",
                          backgroundColor: "white",
                          borderRadius: "4px",
                        }}
                      >
                        <div style={{ height: "100%" }}>
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              gap: "20px",
                              flexDirection: "column",
                            }}
                          >
                            <div style={{ height: "100%" }}>
                              <label
                                htmlFor="fileInput"
                                className="button"
                                style={{
                                  background: "#4CAF50",
                                  color: "white",
                                  cursor: "pointer",
                                  padding: "8px",
                                  borderRadius: "2px",
                                }}
                              >
                                Choose Application Form
                                <input
                                  type="file"
                                  id="fileInput"
                                  style={{ display: "none" }}
                                  accept=".docx, .doc"
                                  onChange={handleFileChange}
                                />
                              </label>
                              {fileName && (
                                <span className="file-name">{fileName}</span>
                              )}{" "}
                              {/* Dosya adını göster */}
                            </div>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                              <label
                                className="button iyte-bg"
                                style={{
                                  background: "#4CAF50",
                                  color: "white",
                                  cursor: "pointer",
                                  padding: "6px",
                                  width: "fit-content",
                                  borderRadius: "2px",
                                }}
                              >
                                Send
                                <input
                                  type="submit"
                                  style={{ display: "none" }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No students with partially filled forms. Please check back later.</p>
      )}
    </div>
  );
}

export default CompanyInternsV2;
