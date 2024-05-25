import React, { useState, useEffect } from "react";
import { GetWithAuth, DeleteWithAuth } from "../../Services/HttpService";
import "./SecretaryHome.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await GetWithAuth("/secretary/studentListWithStatus");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleUploadClick = (student) => {
    setSelectedStudent(student);
    setIsUploadPopupOpen(true);
  };

  const handleUploadFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setUploadFile(file);
    } else {
      alert("You should only upload PDF or DOCX files");
      setUploadFile(null);
    }
  };

  const handleUploadConfirm = async () => {
    if (!uploadFile) {
      alert("You should upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      const response = await fetch(
        `/secretary/${selectedStudent.studentId}/uploadSGK`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("tokenKey"),
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert(`File uploaded successfully for ${selectedStudent.studentName}`);
        fetchStudents(); // Refresh the list to update the SGK status
      } else {
        console.error(
          `Error uploading file for ${selectedStudent.studentName}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        `Error uploading file for ${selectedStudent.studentName}:`,
        error
      );
    }

    setIsUploadPopupOpen(false);
    setUploadFile(null);
    setSelectedStudent(null);
  };

  const handleUploadCancel = () => {
    setIsUploadPopupOpen(false);
    setUploadFile(null);
    setSelectedStudent(null);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setIsDeletePopupOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await DeleteWithAuth(
        `/secretary/${selectedStudent.studentId}/deleteSGK`
      );

      if (response.ok) {
        alert(`File deleted successfully for ${selectedStudent.studentName}`);
        fetchStudents(); // Refresh the list to update the SGK status
      } else {
        console.error(
          `Error deleting file for ${selectedStudent.studentName}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        `Error deleting file for ${selectedStudent.studentName}:`,
        error
      );
    }

    setIsDeletePopupOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteCancel = () => {
    setIsDeletePopupOpen(false);
    setSelectedStudent(null);
  };

  const handleDownload = async () => {
    try {
      const response = await GetWithAuth("/secretary/studentList/download");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "students.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading student list:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px 20px",
        width: "100%",
        borderRadius: "10px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          marginBottom: "5px",
          display: "flex",
          justifyContent: "space-between",
          paddingInline: "8px",
        }}
      >
        <h1 style={{ color: "", fontSize: "24px" }}>Students</h1>
        <button
          onClick={handleDownload}
          style={{
            padding: "10px 20px",
            backgroundColor: "rgb(153, 27, 27)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#a71d2a")}
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "rgb(153, 27, 27)")
          }
        >
          Download Student List
        </button>
      </div>
      {students.map((student, index) => (
        <div
          key={student.studentId}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              flex: 1,
              fontWeight: "600",
              height: "40px",
              paddingInline: "10px",
              display: "flex",
              alignItems: "center",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            {student.studentName}
          </div>
          {student.sgkDocumentStatus === "Unavailable" ? (
            <>
              <button
                onClick={() => handleUploadClick(student)}
                style={{
                  padding: "10px",
                  backgroundColor: "rgb(153, 27, 27)",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginRight: "5px",
                  transition: "background-color 0.3s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#a71d2a")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgb(153, 27, 27)")
                }
              >
                Upload
              </button>
            </>
          ) : (
            <button
              onClick={() => handleDeleteClick(student)}
              style={{
                padding: "10px",
                height: "40px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a6268")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {isUploadPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Upload SGK File</h3>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleUploadFileChange}
            />
            {uploadFile && <p>{uploadFile.name}</p>}
            <button onClick={handleUploadConfirm}>Ok</button>
            <button onClick={handleUploadCancel}>Cancel</button>
          </div>
        </div>
      )}

      {isDeletePopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>Are you sure?</h3>
            <button onClick={handleDeleteConfirm}>Ok</button>
            <button onClick={handleDeleteCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
