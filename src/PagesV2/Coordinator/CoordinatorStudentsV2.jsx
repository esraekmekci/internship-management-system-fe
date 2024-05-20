import React, { useState, useEffect } from "react";
import "../../Pages/Coordinator/CoordinatorStudents.css";
import CoordinatorHome from "./CoordinatorHomeV2.jsx";
import { GetWithAuth } from "../../Services/HttpService";
import { PutWithAuth } from "../../Services/HttpService";

/*
const initialStudents = [
    { id: 1, name: 'Student 1', applicationLetterStatus: 'Pending', applicationFormStatus: 'Pending' },
    { id: 2, name: 'Student 2', applicationLetterStatus: 'Pending', applicationFormStatus: 'Pending' },
    { id: 3, name: 'Student 3', applicationLetterStatus: 'Pending', applicationFormStatus: 'Pending' }
];
*/

export default function CoordinatorStudentsV2() {
  const [applications, setApplications] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [feedback, setFeedback] = useState("");

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
        setApplications(result);
      } catch (error) {
        console.log(error);
        console.log("application not found");
      }
    };

    fetchCompany();
  }, []);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setMessage("");
    setDocumentType("");
    setFeedback("");
  };

  const handleApprove = async (type, application) => {
    await PutWithAuth(
      `/coordinator/approveApplicationForm?applicationId=${application.applicationId}`
    );
    setMessage(`${type.replace(/([A-Z])/g, " $1")} is approved successfully.`);
  };

  const handleReject = async (type, application) => {
    setDocumentType(type);
    await PutWithAuth(
      `/coordinator/approveApplicationForm?applicationId=${application.applicationId}`
    );
    alert(`Enter feedback for ${type.replace(/([A-Z])/g, " $1")}`);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSendFeedback = () => {
    if (feedback.trim() === "") {
      alert("Please enter feedback before sending.");
      return;
    }
    setMessage("Feedback sent successfully.");
    setDocumentType("");
    setFeedback("");
  };

  return (
    <div style={{width: "100%"}}>
      <div className="student-list">
        {applications.map((application) => (
          <div key={application.applicationId} className="student-item">
            <p>{application.studentName}</p>
            <button onClick={() => handleSelectStudent(application)}>
              Review
            </button>
          </div>
        ))}
      </div>
      {selectedStudent && (
        <div className="student-details">
          <h2>Details for {selectedStudent.studentName}</h2>
          <div className="student-underline"></div>
          <div>
            <p>
              Application Letter Status:{" "}
              {selectedStudent.applicationLetterStatus}
            </p>
            <button
              className="approve-button"
              onClick={() =>
                handleApprove("applicationLetter", selectedStudent)
              }
            >
              Approve Application Letter
            </button>
            <button
              onClick={() => handleReject("applicationLetter", selectedStudent)}
            >
              Reject Application Letter
            </button>
          </div>
          <div>
            <p>
              Application Form Status: {selectedStudent.applicationFormStatus}
            </p>
            <button
              className="approve-button"
              onClick={() => handleApprove("applicationForm", selectedStudent)}
            >
              Approve Application Form
            </button>
            <button
              onClick={() => handleReject("applicationForm", selectedStudent)}
            >
              Reject Application Form
            </button>
          </div>
        </div>
      )}
      {documentType && (
        <div className="dropdown-menu">
          <textarea
            placeholder="Enter feedback here"
            value={feedback}
            onChange={handleFeedbackChange}
          />
          <button className="send-feedback-button" onClick={handleSendFeedback}>
            Send Feedback
          </button>
        </div>
      )}
      {message && <div className="alert">{message}</div>}
    </div>
  );
}
