import React, { useState, useEffect } from 'react';
import { GetWithAuth } from "../../Services/HttpService";
import './CoordinatorAnnouncement.css';
import CoordinatorHome from './CoordinatorHome';

function Modal({ onClose, onConfirm, message }) {
    return (
        <div className="modal-background">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    );
}

function CoordinatorAnnouncement() {
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const [announcements, setAnnouncements] = useState([]);

    const handleViewClick = (announcement) => {
        if (selectedAnnouncement && selectedAnnouncement.id === announcement.id) {
            setSelectedAnnouncement(null);
        } else {
            setSelectedAnnouncement(announcement);
        }
    };

    const handleAction = (type, announcement) => {
        const actions = {
            approve: () => {
                if (window.confirm('Are you sure, the announcement will be posted to all students?')) {
                    alert('Announcement is made.');
                } else {
                    alert('Announcement is rejected.');
                }
            },
            reject: () => {
                alert('Announcement is rejected.');
            }
        };
        actions[type]();
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetWithAuth("/announcement");
                const result = await response.json();
                console.log(result);
                setAnnouncements(result);
            } catch (error) {
                console.log(error);
                console.log("ann not found");
            }
        };
    
        const timeout = setTimeout(() => {
            fetchData();
        }, 1);
    
        return () => clearTimeout(timeout);
    
    }, []);

    return (
        <CoordinatorHome>
            <div className="announcement-section" style={{ marginTop: '60px' }}>
                <h1>Announcements</h1>
                <div className="announcement-underline"></div>
                {announcements.map((announcement) => (
                    <div key={announcement.id} className="announcement-item">
                        <h2>{announcement.comp_name}</h2>
                        <button
                            onClick={() => handleViewClick(announcement)}
                            style={{
                                backgroundColor: selectedAnnouncement && selectedAnnouncement.id === announcement.id ? '#007BFF' : '#4CAF50',
                                color: 'white'
                            }}
                        >
                            View
                        </button>
                        <div className="announcement-mini-underline"></div>
                        {selectedAnnouncement && selectedAnnouncement.id === announcement.id && (
                            <div className="announcement-details">
                                <p>{announcement.content}</p>
                                <button className='btn' onClick={() => handleAction('approve', announcement)}>Approve</button>
                                <button onClick={() => handleAction('reject', announcement)}>Reject</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showModal && (
                <Modal
                    message={modalConfig.message}
                    onClose={modalConfig.onClose}
                    onConfirm={modalConfig.onConfirm}
                />
            )}
        </CoordinatorHome>
    );
}

export default CoordinatorAnnouncement;
