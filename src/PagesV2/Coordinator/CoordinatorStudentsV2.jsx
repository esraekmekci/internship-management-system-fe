import React, { useState, useEffect } from "react";
import "../../Pages/Coordinator/CoordinatorStudents.css";
import { GetWithAuth } from "../../Services/HttpService";
import { PutWithAuth } from "../../Services/HttpService";
import Loading from "../../Pages/LoadingPage";

function CoordinatorStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await GetWithAuth("/api/coordinator/studentApplications");
        const result = await response.json();
        const filteredStudents = result.filter(ApplicationForCoordinatorResponse => ApplicationForCoordinatorResponse.applicationStatus !== "Application Letter Approved");
        setStudents(filteredStudents);
      } catch (error) {
        console.log(error);
        console.log("application not found");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    console.log(student.applicationId);
  };

  const updateStudentFormStatus = (status, student) => {
    const actions = {
      approve: async () => {
        await PutWithAuth(
          `/api/coordinator/approveApplicationForm?applicationId=${student.applicationId}`
        );
        alert("Application form is approved successfully.");
        window.location.reload();
      },
      reject: async () => {
        await PutWithAuth(
          `/api/coordinator/rejectApplicationForm?applicationId=${student.applicationId}`
        );
        alert("Application form rejected.");
        window.location.reload();
      },
    };
    actions[status]();
  };

  const downloadDocument = (type) => {
    fetch(
      "/api/student/" +
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
      <Loading isLoading={loading} />
      <h1>Students</h1>
      <div
        className=""
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {students.map((student) => (
          <div
            key={student.applicationId}
            className=" padding-sm shadow-sm"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingInline: "12px",
            }}
          >
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              {student.studentName}
            </div>
            <button className="iyte-bg" onClick={() => handleSelectStudent(student)}>Review</button>
          </div>
        ))}
      </div>
      {selectedStudent && (
        <div>
          <h2>Details for {selectedStudent.studentName}</h2>
          <div className="student-underline"></div>
          <div
            className="status-container"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p style={{ marginBottom: "0px", fontSize: "20px" }}>
              Application Letter
            </p>
            <button className="iyte-bg" onClick={() => downloadDocument("Letter")} style={{width: "240px"}}>
              Download Application Letter
            </button>
          </div>
          <div
            className="status-container"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p style={{ marginBottom: "0px", fontSize: "20px" }}>
              Application Status:
            </p>
            <div>
              <p>{selectedStudent.applicationStatus}</p>
              <div className="" style={{ marginTop: "0", width: "240px", minWidth: "240px", fontSize: "20px" }}>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default CoordinatorStudents;
