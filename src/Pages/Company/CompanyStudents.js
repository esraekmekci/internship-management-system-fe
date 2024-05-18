import React, { useState, useEffect } from 'react';
import CompanyHome from './CompanyHome.js';
import './CompanyStudents.css';

function CompanyStudents() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [showPopup, setShowPopup] = useState({ show: false, type: "", student: null });

    useEffect(() => {
        // Örnek öğrenci verileri, her öğrenci için dosya URL'leri de eklenmiş
        const sampleStudents = [
            { id: 1, name: "XX", fileUrl: "https://example.pdf" },
            { id: 2, name: "YY", fileUrl: "https://ornek.docx" },
        ];
        setStudents(sampleStudents);
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
        setShowPopup({ show: false, type: "", student: null });
        setSelectedStudent(null);
    };

    const confirmRejection = () => {
        if (feedback === "") {
            alert("Please provide feedback for rejection.");
            return;
        }
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

    return (
        <CompanyHome>
            <div className="announcement-section" style={{ marginTop: '60px' }}>
                <h1>Students</h1>
            </div>
            <div>
                {students.map((student) => (
                    <div key={student.id} className="announcement-section">
                        <h2 onClick={() => handleSelectStudent(student)} style={{ cursor: 'pointer' }}>
                            {student.name}
                        </h2>
                        {selectedStudent === student && (
                            <div className="student-details">
                                <h3>Application Letter</h3>
                                {renderFilePreview(student)}
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
