import React, { useState, useEffect } from 'react';
import CompanyHome from './CompanyHome.js';
import './CompanyAnnouncement.css';

function CompanyAnnouncement() {
    const [announcements, setAnnouncements] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newFile, setNewFile] = useState(null);
    const [showDropdown, setShowDropdown] = useState({ newAnn: false });
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState({ show: false, index: null });

    useEffect(() => {
        const sampleAnnouncements = [
            { title: "Sample Announcement 1", description: "Description of sample announcement 1", date: "2024-05-15", status: "Published" },
            { title: "Sample Announcement 2", description: "Description of sample announcement 2", date: "2024-05-14", status: "Pending" },
        ];
        setAnnouncements(sampleAnnouncements);
    }, []);

    const handleNewTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleNewDescriptionChange = (event) => {
        setNewDescription(event.target.value);
    };

    const handleFileChange = (event) => {
        setNewFile(event.target.files[0]);
    };

    const handleNewAnnouncement = () => {
        if (newTitle === "" || newDescription === "") {
            setErrorMessage("Mandatory fields must be filled.");
            return;
        }
        setShowPopup(true);
    };

    const confirmNewAnnouncement = () => {
        const newAnnouncement = {
            title: newTitle,
            description: newDescription,
            date: new Date().toISOString().split('T')[0],
            status: "Waiting for approval",
            file: newFile ? newFile.name : null
        };
        setAnnouncements([...announcements, newAnnouncement]);
        setShowPopup(false);
        setShowDropdown({ newAnn: false });
        setNewTitle("");
        setNewDescription("");
        setNewFile(null);
        setErrorMessage("");
        alert("Announcement saved. Waiting for the approval of the internship committee coordinator.");
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => ({ ...prev, newAnn: !prev.newAnn }));
    };

    const handleAnnouncementClick = (index) => {
        setSelectedAnnouncement(selectedAnnouncement === index ? null : index);
    };

    const confirmDeleteAnnouncement = () => {
        const updatedAnnouncements = announcements.filter((_, i) => i !== showDeletePopup.index);
        setAnnouncements(updatedAnnouncements);
        setSelectedAnnouncement(null);
        setShowDeletePopup({ show: false, index: null });
    };

    const handleDeleteClick = (index) => {
        setShowDeletePopup({ show: true, index });
    };

    return (
        <CompanyHome>
            <div className="announcement-section" style={{ marginTop: '60px' }}>
                <h1>Announcements</h1>
            </div>

            <div>
                {announcements.map((announcement, index) => (
                    <div key={index} className="announcement-section">
                        <h2 onClick={() => handleAnnouncementClick(index)} style={{ cursor: 'pointer' }}>
                            {announcement.title}
                            <span style={{ float: 'right', fontSize: '15px' }}>Status: {announcement.status}</span>
                        </h2>
                        {selectedAnnouncement === index && (
                            <>
                                <p>{announcement.description}</p>
                                <p>Date: {announcement.date}</p>
                                {announcement.file && <p>File: {announcement.file}</p>}
                                <button onClick={() => handleDeleteClick(index)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="new-ann-button">
                <button onClick={() => toggleDropdown('newAnn')} style={{ display: 'block' }}>New Announcement</button>
                {showDropdown.newAnn && (
                    <div className="new-announcement-form">
                        <input type="text" placeholder="Title" value={newTitle} style={{ marginLeft: '10px' }} onChange={handleNewTitleChange} />
                        <textarea placeholder="Description" value={newDescription} style={{ marginLeft: '10px' }} onChange={handleNewDescriptionChange}></textarea>
                        <input type="file" onChange={handleFileChange} style={{ margin: '10px' }}/>
                        <button onClick={handleNewAnnouncement}>Enter</button>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                )}
            </div>

            {showPopup && (
                <div className="popup">
                    <h2>Confirm New Announcement</h2>
                    <p>Title: {newTitle}</p>
                    <p>Description: {newDescription}</p>
                    {newFile && <p>File: {newFile.name}</p>}
                    <button onClick={confirmNewAnnouncement}>Yes</button>
                    <button onClick={() => setShowPopup(false)}>No</button>
                </div>
            )}

            {showDeletePopup.show && (
                <div className="popup">
                    <h2>Are you sure you want to delete this announcement?</h2>
                    <button onClick={confirmDeleteAnnouncement}>Yes</button>
                    <button onClick={() => setShowDeletePopup({ show: false, index: null })}>No</button>
                </div>
            )}
        </CompanyHome>
    );
}

export default CompanyAnnouncement;
