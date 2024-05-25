import React, { useState, useEffect } from "react";
import {
  GetWithAuth,
  PostWithAuth,
  DeleteWithAuth,
} from "../../Services/HttpService";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await GetWithAuth("/api/secretary/studentListWithStatus");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleUpload = async (student, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `/api/secretary/${student.studentId}/uploadSGK`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("tokenKey"),
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert(`File uploaded successfully for ${student.studentName}`);
        fetchStudents(); // Refresh the list to update the SGK status
      } else {
        console.error(
          `Error uploading file for ${student.studentName}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error uploading file for ${student.studentName}:`, error);
    }
  };

  const handleDelete = async (student) => {
    try {
      const response = await DeleteWithAuth(
        `/api/secretary/${student.studentId}/deleteSGK`
      );

      if (response.ok) {
        alert(`File deleted successfully for ${student.studentName}`);
        fetchStudents(); // Refresh the list to update the SGK status
      } else {
        console.error(
          `Error deleting file for ${student.studentName}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error deleting file for ${student.studentName}:`, error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await GetWithAuth("/api/secretary/studentList/download");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "students.csv";
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
              <input
                type="file"
                id={`upload-${index}`}
                accept=".pdf"
                style={{ display: "none", height: "40px" }}
                onChange={(e) => handleUpload(student, e.target.files[0])}
              />
              <label
                htmlFor={`upload-${index}`}
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
              </label>
            </>
          ) : (
            <button
              onClick={() => handleDelete(student)}
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
    </div>
  );
}
