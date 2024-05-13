import React, { useState } from 'react';
import './CoordinatorStudents.css';
import CoordinatorHome from './CoordinatorHome';

/*
Arkadaşlar notificationları nasıl yapacağımıza tam karar vermediğimizden dolayı çok yüzeysel bıraktım.
Bir de aşşağı kaydırınca neden beyaz bir alan oluştuğunu anlamadım.
*/

const students = [
    { id: 1, name: 'Student 1', applicationStatus: 'Pending', reportStatus: 'Pending', formStatus: 'Pending' },
    { id: 2, name: 'Student 2', applicationStatus: 'Pending', reportStatus: 'Pending', formStatus: 'Pending' },
    { id: 3, name: 'Student 3', applicationStatus: 'Pending', reportStatus: 'Pending', formStatus: 'Pending' }
];

function CoordinatorStudents() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [feedback, setFeedback] = useState(''); // State to hold feedback text

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setMessage('');
        setDocumentType('');
        setFeedback('');
    };

    const handleApprove = (type) => {
        const updatedStatus = { ...selectedStudent, [`${type}Status`]: 'Approved' };
        setSelectedStudent(updatedStatus);
        setMessage(`${type.replace(/([A-Z])/g, ' $1')} is approved successfully.`);
    };

    const handleReject = (type) => {
        setDocumentType(type);
        alert(`Enter feedback for ${type.replace(/([A-Z])/g, ' $1')}`);
        //setMessage(`Enter feedback for ${type.replace(/([A-Z])/g, ' $1')}`);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value); // Update feedback on each keystroke
    };

    const handleSendFeedback = () => {
        if (feedback.trim() === '') {
            alert('Please enter feedback before sending.'); // Prompt user to enter feedback if empty
            return;
        }
        const updatedStatus = { ...selectedStudent, [`${documentType}Status`]: 'Requires Revision' };
        setSelectedStudent(updatedStatus);
        setMessage('Feedback sent successfully.'); // Updated message
        setDocumentType('');
        setFeedback('');
    };

    return (
        <CoordinatorHome>
            <div className="student-list">
                {students.map((student) => (
                    <div key={student.id} className="student-item">
                        <p>{student.name}</p>
                        <button onClick={() => handleSelectStudent(student)}>Review</button>
                    </div>
                ))}
            </div>
            {selectedStudent && (
                <div className="student-details">
                    <h2>Details for {selectedStudent.name}</h2>
                    <div className='student-underline'></div>
                    <div>
                        <p>Application Status: {selectedStudent.applicationStatus}</p>
                        <button className='approve-button' onClick={() => handleApprove('application')}>Approve Application</button>
                        <button onClick={() => handleReject('application')}>Reject Application</button>
                    </div>
                    <div>
                        <p>Report Status: {selectedStudent.reportStatus}</p>
                        <button onClick={() => handleApprove('report')}>Approve Report</button>
                        <button onClick={() => handleReject('report')}>Reject Report</button>
                    </div>
                    <div>
                        <p>Company Form Status: {selectedStudent.formStatus}</p>
                        <button onClick={() => handleApprove('form')}>Approve Company Form</button>
                        <button onClick={() => handleReject('form')}>Reject Company Form</button>
                    </div>

                </div>
            )}
            {documentType && (
                <div>
                    <textarea
                        placeholder="Enter feedback here"
                        value={feedback}
                        onChange={handleFeedbackChange}
                    />
                    <button className="send-feedback-button" onClick={handleSendFeedback}>Send Feedback</button>
                </div>
            )}
            {message && <div className="alert">{message}</div>}
        </CoordinatorHome>
    );
}

export default CoordinatorStudents;
