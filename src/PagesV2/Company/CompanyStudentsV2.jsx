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

const evaluateApplicationLetter = async (type) => {
    fetch("/company/" + user.companyid + "/" + type + "ApplicationLetter?applicationId=" + selectedStudent.applicationId, {
        method: 'PUT',
        headers: {
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response;
    })
    .then(result => {
        if (type === "approve") {
            alert("Approved successfully");
        } else {    
            alert("Rejected successfully");
        }
        window.location.reload();
        console.log(result);
    })
    .catch(err => {
        console.error("Error occurred:", err);
        alert("Error occurred:", err);
    });
}

const downloadApplicationLetter = () => {
    fetch("/company/" + user.companyid + "/downloadApplicationLetter?studentId=" + selectedStudent.studentId, {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.blob(); 
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob); 
      const a = document.createElement('a'); 
      a.href = url;
      a.download = "ApplicationLetter_" + selectedStudent.studentName + ".docx";
      document.body.appendChild(a);
      a.click(); 
      a.remove(); 
      window.URL.revokeObjectURL(url); 
      alert(`Application Letter downloaded successfully`);
    })
    .catch(err => {
      console.error("Error occurred:", err);
      alert(`Application Letter download is unsuccessful`);
    });
  };

  return (
    <div style={{ padding: "20px 40px", width: "100%", overflowY: 'auto'}}>
      <div className="announcement-section" style={{ marginTop: '60px' }}>
        <h1>Students</h1>
      </div>
      <div>
                {applications.map((application) => (
                    <div key={application.applicationId} className="announcement-section">
                        <h2 onClick={() => handleSelectStudent(application)} style={{ cursor: 'pointer' }}>
                            {application.studentName}
                            <span style={{float:'right', fontSize:'15px'}}>Status: {application.applicationStatus}</span>
                        </h2>
                        {selectedStudent === application && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <button className='button' onClick={() => downloadApplicationLetter()} style={{ float: 'left' }}>
                                    Show Application Letter
                                </button>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <button onClick={handleApprove} style={{ backgroundColor: 'green' }}>
                                        Approve
                                    </button>
                                    <button onClick={handleReject} style={{ backgroundColor: 'red' }}>
                                        Reject
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showPopup.show && (
                <div className="popup">
                    {showPopup.type === "approve" && (
                        <>
                            <h2>Are you sure you want to approve this application?</h2>
                            <button onClick={confirmApproval}>Yes</button>
                            <button onClick={() => setShowPopup({ show: false, type: "", student: null })}>No</button>
                        </>
                    )}
                    {showPopup.type === "reject" && (
                        <>
                            <h2>Please provide feedback for rejection:</h2>
                            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
                            <button onClick={confirmRejection}>Submit</button>
                            <button onClick={() => setShowPopup({ show: false, type: "", student: null })}>Cancel</button>
                        </>
                    )}
                </div>
            )}
    </div>
  );
}

export default CompanyStudentsV2;
