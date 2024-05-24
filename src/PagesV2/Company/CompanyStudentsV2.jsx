import React, { useState, useEffect } from "react";
import { GetWithAuth } from "../../Services/HttpService";
import "../../Pages/Company/CompanyStudents.css";
import { useUser } from "../../Components//UserContext";

function CompanyStudentsV2() {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showPopup, setShowPopup] = useState({
    show: false,
    type: "",
    student: null,
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await GetWithAuth(
          "/company/" + user.companyid + "/applicants"
        );
        const result = await response.json();
        setApplications(result);
      } catch (error) {
        console.log(error);
        console.log("application not found");
      }
    };

    fetchStudents();
  }, []);

  const handleSelectStudent = (student) => {
    setSelectedStudent(selectedStudent === student ? null : student);
  };

  const handleApprove = () => {
    setShowPopup({ show: true, type: "approve", student: selectedStudent });
  };

  const handleReject = () => {
    setShowPopup({ show: true, type: "reject", student: selectedStudent });
  };

  const confirmApproval = () => {
    alert("Approved successfully");
    evaluateApplicationLetter("approve");

    // Reset state
    setShowPopup({ show: false, type: "", student: null });
    setSelectedStudent(null);
  };

  const confirmRejection = () => {
    if (feedback === "") {
      alert("Please provide feedback for rejection.");
      return;
    }

    evaluateApplicationLetter("reject");
    alert("Rejection email sent with feedback.");
    setShowPopup({ show: false, type: "", student: null });
    setSelectedStudent(null);
    setFeedback("");
  };

  const renderFilePreview = (student) => {
    if (!student.fileUrl) return null;
    if (student.fileUrl.endsWith(".pdf")) {
      return (
        <embed
          src={student.fileUrl}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      );
    } else if (student.fileUrl.endsWith(".docx")) {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(student.fileUrl)}&embedded=true`}
          style={{ width: "100%", height: "500px" }}
        ></iframe>
      );
    }
  };

  const evaluateApplicationLetter = async (type) => {
    fetch(
      "company/" +
        user.companyid +
        "/" +
        type +
        "ApplicationLetter?applicationId=" +
        selectedStudent.applicationId,
      {
        method: "PUT",
        headers: {},
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
        if (type === "approve") {
          alert("Approved successfully");
        } else {
          alert("Rejected successfully");
        }
        window.location.reload();
        console.log(result);
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert("Error occurred:", err);
      });
  };

  return (
    <div className="w-full-padding">
      <div>
        <h1 style={{ paddingBottom: "20px", borderBottom: "1px solid #ccc" }}>
          Students
        </h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {applications.map((application) => (
          <div
            key={application.applicationId}
            style={{
              padding: "8px 20px",
              borderBottom: "1px solid #fafafa",
              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              borderRadius: "8px",
            }}
          >
            <h3
              onClick={() => handleSelectStudent(application)}
              style={{ cursor: "pointer" }}
            >
              {application.studentName}
              <span style={{ float: "right", fontSize: "15px" }}>
                Status: {application.applicationStatus}
              </span>
            </h3>
            {selectedStudent === application && (
              <div className="">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{ fontSize: "16px", color: "gray", margin: "4px" }}
                  >
                    Application Letter
                  </h3>
                  {renderFilePreview(application)}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      className="green-bg"
                      style={{ marginInline: "0" }}
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                    <button className="iyte-bg" onClick={handleReject}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showPopup.show && (
        <div
          className=""
          style={{
            maxWidth:"800px",
            backgroundColor: "white",
            position: "fixed",
            padding: "25px",
            boxSizing: "border-box",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          {showPopup.type === "approve" && (
            <>
              <h2>
                Are you sure you want to approve {selectedStudent.studentName}'s
                application?
              </h2>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="green-bg" onClick={confirmApproval}>
                  Yes
                </button>
                <button
                  className="iyte-bg"
                  onClick={() =>
                    setShowPopup({ show: false, type: "", student: null })
                  }
                >
                  No
                </button>
              </div>
            </>
          )}
          {showPopup.type === "reject" && (
            <>
              <h2>Please provide feedback for rejection:</h2>
              <textarea
                style={{
                  margin: "0",
                  padding: "2px",
                  width: "100%",
                  borderRadius: "8px",
                }}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <button onClick={confirmRejection}>Submit</button>
                <button
                  style={{ marginRight: "0" }}
                  className="iyte-bg"
                  onClick={() =>
                    setShowPopup({ show: false, type: "", student: null })
                  }
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CompanyStudentsV2;
