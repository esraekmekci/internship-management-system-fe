import React, { useState } from 'react';
import './CoordinatorAnnouncement.css';
import CoordinatorHome from './CoordinatorHome';

const announcements = [
    { id: 1, name: 'Announcement 1', content: 'Contents of Announcement 1.' },
    { id: 2, name: 'Announcement 2', content: 'Contents of Announcement 2.' },
    { id: 3, name: 'Announcement 3', content: 'Contents of Announcement 3.' }
];

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
                //Kullanıcıya mesaj gösterme
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
    

    return (
        <CoordinatorHome>
            <div className="announcement-section" style={{ marginTop: '60px' }}>
                <h1>Announcements</h1>
                <div className="announcement-underline"></div>
                {announcements.map((announcement) => (
                    <div key={announcement.id} className="announcement-item">
                        <h2>{announcement.name}</h2>
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
