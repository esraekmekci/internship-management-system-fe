import React, { useState, useEffect } from "react";
import "../../Pages/Coordinator/CoordinatorStudents.css";
import CoordinatorHome from "./CoordinatorHomeV2.jsx";
import { GetWithAuth } from "../../Services/HttpService";
import { PutWithAuth } from "../../Services/HttpService";

function CoordinatorStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await GetWithAuth(
          "/coordinator/token/" + localStorage.getItem("tokenKey")
        );
        const result = await response.json();
        console.log(result);
        await fetchStudents(result);
      } catch (error) {
        console.log(error);
        console.log("User not found");
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await GetWithAuth("/coordinator/studentApplications");
        const result = await response.json();
        console.log(result);
        setStudents(result);
      } catch (error) {
        console.log(error);
        console.log("application not found");
      }
    };

    fetchCompany();
  }, []);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    console.log(student.applicationId);
  };

  const updateStudentFormStatus = (status, student) => {
    const actions = {
      approve: async () => {
        await PutWithAuth(
          `/coordinator/approveApplicationForm?applicationId=${student.applicationId}`
        );
        alert("Announcement is made.");
        window.location.reload();
      },
      reject: async () => {
        await PutWithAuth(
          `/coordinator/rejectApplicationForm?applicationId=${student.applicationId}`
        );
        alert("Announcement is rejected.");
        window.location.reload();
      },
    };
    actions[status]();
  };

  const downloadDocument = (type) => {
    fetch(
      "/student/" +
        selectedStudent.studentId +
        "/downloadApplication" +
        type +
        "?companyName=" +
        selectedStudent.companyName,
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
          "Application" + type + "_" + selectedStudent.companyName + ".docx"; // İndirilecek dosyanın adını belirle
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

  return (
    <div className="w-full-padding">
      <div
        className=""
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {students.map((student) => (
          <div
            key={student.applicationId}
            className=" padding-sm shadow-sm"
            style={{ display: "flex", justifyContent: "space-between", paddingInline: "12px" }}
          >
            <div style={{width: "100%", display: "flex", alignItems: "center"}}>{student.studentName}</div>
            <button onClick={() => handleSelectStudent(student)}>Review</button>
          </div>
        ))}
      </div>
      {selectedStudent && (
        <div className="student-details">
          <h2>Details for {selectedStudent.studentName}</h2>
          <div className="student-underline"></div>
          <div className="status-container">
            <p>Application Letter</p>
            <button
              className="download-button"
              onClick={() => downloadDocument("Letter")}
            >
              Download Application Letter
            </button>
          </div>
          <div className="status-container">
            <p>Application Status: {selectedStudent.applicationStatus}</p>
          </div>
          <div className="action-buttons">
            {selectedStudent.applicationStatus ===
              "Application Letter Approved"}
            {selectedStudent.applicationStatus ===
              "Application Form Sent to Company"}
            {selectedStudent.applicationStatus ===
              "Application Form Sent to Coordinator" && (
              <>
                <button
                  className="button"
                  onClick={() => downloadDocument("Form")}
                >
                  Download Application Form
                </button>
                <button
                  className="approve-button"
                  onClick={() =>
                    updateStudentFormStatus("approve", selectedStudent)
                  }
                >
                  Approve Application Form
                </button>
                <button
                  className="reject-button"
                  onClick={() =>
                    updateStudentFormStatus("reject", selectedStudent)
                  }
                >
                  Reject Application Form
                </button>
              </>
            )}
            {selectedStudent.applicationStatus ===
              "Application Form Approved" && (
              <>
                <button
                  className="button"
                  onClick={() => downloadDocument("Form")}
                >
                  Download Application Form
                </button>
              </>
            )}
            {selectedStudent.applicationStatus ===
              "Application Form Rejected" && (
              <>
                <button
                  className="button"
                  onClick={() => downloadDocument("Form")}
                >
                  Download Application Form
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoordinatorStudents;
