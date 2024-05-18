import React, { useState, useEffect } from 'react';
import CompanyHome from './CompanyHome.js';
import { GetWithAuth } from "../../Services/HttpService";
import './CompanyStudents.css';

function CompanyStudents() {
    const [currentUser, setCurrentUser] = useState({});
    const [applications, setApplications] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [showPopup, setShowPopup] = useState({ show: false, type: "", student: null });

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await GetWithAuth("/company/token/" + localStorage.getItem("tokenKey"));
                const result = await response.json();
                console.log(result);
                setCurrentUser(result);
                await fetchStudents(result);
            } catch (error) {
                console.log(error);
                console.log("User not found");
            }
        };

        const fetchStudents = async (user) => {
            try {
                const response = await GetWithAuth("/company/" + user.companyid + "/applicants");
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
        if (student.fileUrl.endsWith('.pdf')) {
            return <embed src={student.fileUrl} type="application/pdf" width="100%" height="500px" />;
        } else if (student.fileUrl.endsWith('.docx')) {
            return (
                <iframe src={`https://docs.google.com/gview?url=${encodeURIComponent(student.fileUrl)}&embedded=true`} 
                        style={{ width: '100%', height: '500px' }} >
                </iframe>
            );
        }
    };

    const evaluateApplicationLetter = async (type) => {
        fetch("company/" + currentUser.companyid + "/" + type + "ApplicationLetter?applicationId=" + selectedStudent.applicationId, {
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

    return (
        <CompanyHome>
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
                            <div className="student-details">
                                <h3>Application Letter</h3>
                                {renderFilePreview(application)}
                                <div style={{ display: 'flex' }}>
                                    <button onClick={handleApprove}>Approve</button>
                                    <button onClick={handleReject}>Reject</button>
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
        </CompanyHome>
    );
}

export default CompanyStudents;

//KOD ÇALIŞMADIĞI İŞİN DEĞİŞTİRDİM ESKİ HALİ ALTTADIR.

/*
import React, { useState, useEffect } from 'react';
import CompanyHome from './CompanyHome.js';
import { GetWithAuth } from "../../Services/HttpService";
import './CompanyStudents.css';

function CompanyStudents() {
    var [currentUser, setCurrentUser] = useState({});
    //const [applications, setApplications] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [showPopup, setShowPopup] = useState({ show: false, type: "", student: null });
    const [applicationLetter, setApplicationLetter] = useState("");

    const [applications, setApplications] = useState([
        {
            applicationId: 'app1',
            studentName: 'John Doe',
            applicationStatus: 'Pending',
            pdfUrl: 'https://www.example.com/pdf/sample1.pdf' // This should be replaced with an actual URL
        },
        {
            applicationId: 'app2',
            studentName: 'Jane Smith',
            applicationStatus: 'Reviewed',
            pdfUrl: 'https://www.example.com/pdf/sample2.pdf' // This should be replaced with an actual URL
        },
        {
            applicationId: 'app3',
            studentName: 'Alice Johnson',
            applicationStatus: 'Approved',
            pdfUrl: 'https://www.example.com/pdf/sample3.pdf' // This should be replaced with an actual URL
        }
    ]);

    useEffect(() => {
        const fetchCompany = async () => {
          try {
            const response = await GetWithAuth("/company/token/" + localStorage.getItem("tokenKey"));
            const result = await response.json();
            console.log(result);
            setCurrentUser(result);
            await fetchStudents(result);
          } catch (error) {
            console.log(error);
            console.log("User not found");
          }
        };
        
        const fetchStudents = async (user) => {
          try {
              const response = await GetWithAuth("/company/" + user.companyid + "/applicants");
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
        setSelectedStudent(selectedStudent === student ? null : student);
    };

    const handleApprove = () => {
        setShowPopup({ show: true, type: "approve", student: selectedStudent });
    };

    const handleReject = () => {
        setShowPopup({ show: true, type: "reject", student: selectedStudent });
    };

    const confirmApproval = () => {
        // Handle email sending logic here for approval
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
        // Handle email sending logic here for rejection with feedback
        evaluateApplicationLetter("reject");
        alert("Rejection email sent with feedback.");
        // Reset state
        setShowPopup({ show: false, type: "", student: null });
        setSelectedStudent(null);
        setFeedback("");
    };

    const evaluateApplicationLetter = async (type) => {
        fetch("company/" + currentUser.companyid + "/" + type + "ApplicationLetter?applicationId=" + selectedStudent.applicationId, {
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

    return (
        <CompanyHome>
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
                            <div className="student-details">
                                <h3>Application Letter</h3>
                                <p>burda önizlemesi olacak</p>
                                <iframe src={application.pdfUrl} title="Application Letter" className="pdf-preview" style={{ width: '100%', height: '500px' }}></iframe>
                                <div style={{ display: 'flex' }}> 
                                    <button onClick={handleApprove}>Approve</button>
                                    <button onClick={handleReject}>Reject</button>
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
        </CompanyHome>
    );
}

export default CompanyStudents;

