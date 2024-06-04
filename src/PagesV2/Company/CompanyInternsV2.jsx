import React, { useState, useEffect } from "react";
import { GetWithAuth } from "../../Services/HttpService";
import "../../Pages/Company/CompanyInterns.css";
import { useUser } from "../../Components/UserContext.jsx";
import Loading from "../../Pages/LoadingPage.jsx";

function CompanyInternsV2() {
  const { user } = useUser();
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("Select file");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await GetWithAuth(
          "/api/company/" + user.companyid + "/interns"
        );
        const result = await response.json();
        setInterns(result);
      } catch (error) {
        console.log(error);
        console.log("application not found");
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, [user.companyid]);

  const handleSelectIntern = (intern) => {
    if (selectedIntern === intern) {
      setSelectedIntern(null);
    } else {
      setSelectedIntern(intern);
    }
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
    e.preventDefault(); // Prevent default form submission behavior
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    if (!(fileName.endsWith(".docx") || fileName.endsWith(".doc"))) {
      alert("Please select a word file!");
      return;
    }

    const formData = new FormData();
    formData.append("studentId", selectedIntern.studentId);
    formData.append("file", selectedFile);

    uploadApplicationForm(formData);
  };

  const downloadApplicationForm = () => {
    GetWithAuth(
      "/api/company/" +
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
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ApplicationForm_" + selectedIntern.studentId + ".docx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        alert(`Application Form downloaded successfully`);
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert(`Application Form download is unsuccessful`);
      });
  };

  const uploadApplicationForm = (formData) => {
    fetch(
      "/api/company/" + user.companyid + "/uploadApplicationForm",
      {
        method: "POST",
        body: formData,
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
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert("Application form upload is unsuccessful.");
      });
  };

  return (
    <div style={{ width: "100%", padding: "20px 40px", overflowY: "auto" }}>
      <h1 style={{ paddingBottom: "20px", borderBottom: "1px solid #ccc" }}>
        My Interns
      </h1>
      <Loading isLoading={loading} />
      {interns.map((intern) => (
        <div key={intern.studentId} className="announcement-section">
          <h2 onClick={() => handleSelectIntern(intern)} style={{ color: "rgb(30 41 59)", cursor: "pointer" }}>
            {intern.studentName}
            <span style={{ float: "right", fontSize: "15px" }}>
              Status: {intern.applicationStatus}
            </span>
          </h2>
          {selectedIntern === intern && (
            <div style={{ display: "flex", flexDirection: 'column' }}>
              <div style={{ justifyContent: "flex-start" }}>
                <button className="iyte-bg" onClick={downloadForm}>
                  Download Form
                </button>
              </div>
              <br />
              <br />
              <div>
                {intern.applicationStatus === "Application Form Sent to Company" && (
                  <form onSubmit={handleSubmitUpload}>
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
                        marginLeft: '5px',
                      }}
                    >
                      Upload Form
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
                    )}
                    <label
                      className="button iyte-bg"
                      style={{
                        display: "flex",
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
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CompanyInternsV2;
