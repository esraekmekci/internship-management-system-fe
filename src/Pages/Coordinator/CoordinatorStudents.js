import React, { useState } from 'react';
import './CoordinatorStudents.css';
import CoordinatorHome from './CoordinatorHome';

const initialStudents = [
    { id: 1, name: 'Student 1', applicationLetterStatus: 'Pending', applicationFormStatus: 'Pending' },
    { id: 2, name: 'Student 2', applicationLetterStatus: 'Pending', applicationFormStatus: 'Pending' },
    { id: 3, name: 'Student 3', applicationLetterStatus: 'Pending', applicationFormStatus: 'Pending' }
];

function CoordinatorStudents() {
    const [students, setStudents] = useState(initialStudents);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setMessage('');
        setDocumentType('');
        setFeedback('');
    };

    const updateStudentStatus = (updatedStudent) => {
        const updatedStudents = students.map(student =>
            student.id === updatedStudent.id ? updatedStudent : student
        );
        setStudents(updatedStudents);
        setSelectedStudent(updatedStudent);
    };

    const handleApprove = (type) => {
        const updatedStatus = { ...selectedStudent, [`${type}Status`]: 'Approved' };
        updateStudentStatus(updatedStatus);
        setMessage(`${type.replace(/([A-Z])/g, ' $1')} is approved successfully.`);
    };

    const handleReject = (type) => {
        setDocumentType(type);
        alert(`Enter feedback for ${type.replace(/([A-Z])/g, ' $1')}`);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSendFeedback = () => {
        if (feedback.trim() === '') {
            alert('Please enter feedback before sending.');
            return;
        }
        const updatedStatus = { ...selectedStudent, [`${documentType}Status`]: 'Requires Revision' };
        updateStudentStatus(updatedStatus);
        setMessage('Feedback sent successfully.');
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
                        <p>Application Letter Status: {selectedStudent.applicationLetterStatus}</p>
                        <button className='approve-button' onClick={() => handleApprove('applicationLetter')}>Approve Application Letter</button>
                        <button onClick={() => handleReject('applicationLetter')}>Reject Application Letter</button>
                    </div>
                    <div>
                        <p>Application Form Status: {selectedStudent.applicationFormStatus}</p>
                        <button className='approve-button' onClick={() => handleApprove('applicationForm')}>Approve Application Form</button>
                        <button onClick={() => handleReject('applicationForm')}>Reject Application Form</button>
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
                    <button className="send-feedback-button" onClick={handleSendFeedback}>Send Feedback</button>
                </div>
            )}
            {message && <div className="alert">{message}</div>}
        </CoordinatorHome>
    );
}

export default CoordinatorStudents;
