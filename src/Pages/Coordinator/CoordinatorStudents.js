import React, { useState , useEffect } from 'react';
import './CoordinatorStudents.css';
import CoordinatorHome from './CoordinatorHome';
import { GetWithAuth } from "../../Services/HttpService";
import { PutWithAuth } from "../../Services/HttpService";



/*
const initialStudents = [
    { id: 1, name: 'Student 1', applicationLetterStatus: 'Pending', applicationFormStatus: 'Pending' },
    { id: 2, name: 'Student 2', applicationLetterStatus: 'Pending', applicationFormStatus: 'Pending' },
    { id: 3, name: 'Student 3', applicationLetterStatus: 'Pending', applicationFormStatus: 'Pending' }
];
*/

function CoordinatorStudents() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await GetWithAuth("/coordinator/token/" + localStorage.getItem("tokenKey"));
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
                setStudents(result);
            } catch (error) {
                console.log(error);
                console.log("application not found");
            }
        };

        fetchCompany();
    }, []);


    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        console.log(student.applicationId);
    };

    const updateStudentFormStatus = (status, student) => {
        const actions = {
            approve: async () => {
                await PutWithAuth(`/coordinator/approveApplicationForm?applicationId=${student.applicationId}`);
                alert('Announcement is made.');
                window.location.reload();
            },
            reject: async () => {
                await PutWithAuth(`/coordinator/rejectApplicationForm?applicationId=${student.applicationId}`);
                alert('Announcement is rejected.');
                window.location.reload();
            }
        };
        actions[status]();
    };

    const downloadDocument = (type) => {
        fetch("/student/" + selectedStudent.studentId + "/downloadApplication"+ type +"?companyName=" + selectedStudent.companyName, {
            method: 'GET',
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.blob(); // Yanıtı blob olarak al
          })
          .then(blob => {
            const url = window.URL.createObjectURL(blob); // Blob'dan bir URL oluştur
            const a = document.createElement('a'); // Yeni bir anchor elementi oluştur
            a.href = url;
            a.download = "Application" + type + "_" + selectedStudent.companyName + ".docx"; // İndirilecek dosyanın adını belirle
            document.body.appendChild(a); // Anchor elementini document'e ekle
            a.click(); // Programatik olarak tıklayarak indirme işlemini başlat
            a.remove(); // Anchor elementini temizle
            window.URL.revokeObjectURL(url); // Oluşturulan URL'i iptal et
            alert(`Application ${type} downloaded successfully`);
          })
          .catch(err => {
            console.error("Error occurred:", err);
            alert(`Application ${type} download is unsuccessful`);
          });

    };

    return (
        <CoordinatorHome>
            <div className="student-list">
                {students.map((student) => (
                    <div key={student.applicationId} className="student-item">
                        <p>{student.studentName}</p>
                        <button onClick={() => handleSelectStudent(student)}>Review</button>
                    </div>
                ))}
            </div>
            {selectedStudent && (
                <div className="student-details">
                    <h2>Details for {selectedStudent.studentName}</h2>
                    <div className='student-underline'></div>
                    <div className="status-container">
                        <p>Application Letter</p>
                        <button className='download-button' onClick={() => downloadDocument('Letter')}>Download Application Letter</button>
                    </div>
                    <div className="status-container">
                        <p>Application Form Status: {selectedStudent.applicationStatus}</p>
                    </div>
                    <div className="action-buttons">
                        {selectedStudent.applicationStatus === 'Application Letter Approved'}
                        {selectedStudent.applicationStatus === 'Application Form Sent to Company'}
                        {selectedStudent.applicationStatus === 'Application Form Sent to Coordinator' && (
                            <>
                                <button className='button' onClick={() => downloadDocument('Form')}>Download Application Form</button>
                                <button className='approve-button' onClick={() => updateStudentFormStatus('approve', selectedStudent)}>Approve Application Form</button>
                                <button className='reject-button' onClick={() => updateStudentFormStatus('reject', selectedStudent)}>Reject Application Form</button>
                            </>
                        )}
                        {selectedStudent.applicationStatus === 'Application Form Approved' && (
                            <>
                                <button className='button' onClick={() => downloadDocument('Form')}>Download Application Form</button>
                            </>
                        )}
                        {selectedStudent.applicationStatus === 'Application Form Rejected' && (
                            <>
                                <button className='button' onClick={() => downloadDocument('Form')}>Download Application Form</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </CoordinatorHome>
    );
}

export default CoordinatorStudents;
