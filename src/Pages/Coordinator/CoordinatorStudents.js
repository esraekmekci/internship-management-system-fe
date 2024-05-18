import React, { useState } from 'react';
import './CoordinatorStudents.css';
import CoordinatorHome from './CoordinatorHome';

const initialStudents = [
    { id: 1, name: 'Student 1', applicationStatus: 'Pending', reportStatus: 'Pending', formStatus: 'Pending', grade: '' },
    { id: 2, name: 'Student 2', applicationStatus: 'Pending', reportStatus: 'Pending', formStatus: 'Pending', grade: '' },
    { id: 3, name: 'Student 3', applicationStatus: 'Pending', reportStatus: 'Pending', formStatus: 'Pending', grade: '' }
];

function CoordinatorStudents() {
    const [students, setStudents] = useState(initialStudents);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [feedback, setFeedback] = useState('');
    const [grade, setGrade] = useState('');
    const [showGradePopup, setShowGradePopup] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(null);

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setMessage('');
        setDocumentType('');
        setFeedback('');
        setGrade('');
        setShowGradePopup(false);
        setShowConfirmation(false);
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

    const handleEnterGrade = () => {
        setShowGradePopup(true);
        setMessage('');
    };

    const handleGradeChange = (e) => {
        setGrade(e.target.value);
    };

    const handleApplyGrade = () => {
        if (grade.trim() === '') {
            alert('Please enter a grade before applying.');
            return;
        }
        setShowConfirmation(true);
        setConfirmationAction('grade');
    };

    const handleConfirmAction = () => {
        if (confirmationAction === 'grade') {
            const updatedStudent = { ...selectedStudent, grade };
            updateStudentStatus(updatedStudent);
            setMessage('Grade saved successfully.');
            alert('The student has been graded');
        }
        setShowConfirmation(false);
        setShowGradePopup(false);
        setConfirmationAction(null);
    };

    const handleCancelConfirmation = () => {
        setShowConfirmation(false);
        setConfirmationAction(null);
    };

    const handleCancelGrade = () => {
        setShowGradePopup(false);
        setGrade('');
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
                        <button className='approve-button' onClick={() => handleApprove('Application')}>Approve Application</button>
                        <button onClick={() => handleReject('Application')}>Reject Application</button>
                    </div>
                    <div>
                        <p>Report Status: {selectedStudent.reportStatus}</p>
                        <button onClick={() => handleApprove('Report')}>Approve Report</button>
                        <button onClick={() => handleReject('Report')}>Reject Report</button>
                    </div>
                    <div>
                        <p>Company Form Status: {selectedStudent.formStatus}</p>
                        <button onClick={() => handleApprove('Form')}>Approve Company Form</button>
                        <button onClick={() => handleReject('Form')}>Reject Company Form</button>
                    </div>
                    <div>
                        <p>Grade: {selectedStudent.grade || 'Not graded yet'}</p>
                        <button className="enter-grade-button" onClick={handleEnterGrade}>Enter Grade</button>
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
            {showGradePopup && (
                <div className="grade-popup">
                    <textarea
                        placeholder="Enter grade here"
                        value={grade}
                        onChange={handleGradeChange}
                    />
                    <button className="confirm-button" onClick={handleApplyGrade}>Confirm</button>
                    <button className="cancel-button" onClick={handleCancelGrade}>Cancel</button>
                </div>
            )}
            {showConfirmation && (
                <div className="confirmation-popup">
                    <p>Are you sure you want to proceed?</p>
                    <button onClick={handleConfirmAction}>Yes</button>
                    <button onClick={handleCancelConfirmation}>No</button>
                </div>
            )}
            {message && <div className="alert">{message}</div>}
        </CoordinatorHome>
    );
}

export default CoordinatorStudents;
