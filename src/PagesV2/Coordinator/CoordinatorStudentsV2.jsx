import React, { useState, useEffect } from "react";
import "../../Pages/Coordinator/CoordinatorStudents.css";
import { GetWithAuth } from "../../Services/HttpService";
import { PutWithAuth } from "../../Services/HttpService";
import Loading from "../../Pages/LoadingPage";
import '../../Pages/Home.css';

function CoordinatorStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);
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
  const toggleStudentDetails = (index) => {
    setSelectedStudentIndex(selectedStudentIndex === index ? null : index);
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
    <div className="" style={{width: "100%", padding: "20px 40px"}}>
      <h1>Students</h1>
      <Loading isLoading={loading} />
      <div className="">
        {students.map((student, index) => (
          <div key={student.applicationId} style={{marginBottom:'15px', padding:'20px', border:'1px solid #ccc', borderRadius:'5px'}} >
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>
              {student.studentName}
            </h3>
            <button className="iyte-bg" onClick={() => toggleStudentDetails(index)}>
              {selectedStudentIndex === index ? 'Hide' : 'Review'}
            </button>
            </div>
            {selectedStudentIndex === index && (
              <div className="company-details">
                <h2>Details for {student.studentName}<p style={{justifyContent:'flex-end'}}>Status: {student.applicationStatus}</p></h2>
                
                <div className="status-container" style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ marginBottom: "0px", fontSize: "20px" }}>
                    Application Letter
                  </p>
                  <button className="iyte-bg" onClick={() => downloadDocument("Letter", student)} style={{width: "240px"}}>
                    Download Application Letter
                  </button>
                </div>
                <div className="status-container" style={{ display: "flex", justifyContent: "space-between" }}>
                  
                  <div>
                    
                    <div className="" style={{ marginTop: "0", width: "240px", minWidth: "240px", fontSize: "20px" }}>
                      {student.applicationStatus === "Application Form Sent to Coordinator" && (
                        <>
                          <button
                            className="button"
                            onClick={() => downloadDocument("Form", student)}
                          >
                            Download Application Form
                          </button>
                          <button
                            className="button"
                            onClick={() =>
                              updateStudentFormStatus("approve", student.applicationId)
                            }
                          >
                            Approve Application Form
                          </button>
                          <button
                            className="button"
                            onClick={() =>
                              updateStudentFormStatus("reject", student.applicationId)
                            }
                          >
                            Reject Application Form
                          </button>
                        </>
                      )}
                      {["Application Form Approved", "Application Form Rejected"].includes(student.applicationStatus) && (
                        <button
                          className="button"
                          onClick={() => downloadDocument("Form", student)}
                        >
                          Download Application Form
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default CoordinatorStudents;

