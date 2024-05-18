import React, { useState, useEffect } from 'react';
import { GetWithAuth } from "../../Services/HttpService";
import CompanyHome from './CompanyHome.js';
import './CompanyAnnouncement.css';

function CompanyAnnouncement() {
    var [currentUser, setCurrentUser] = useState({});
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
        const fetchCompany = async () => {
          try {
            const response = await GetWithAuth("/company/token/" + localStorage.getItem("tokenKey"));
            const result = await response.json();
            console.log(result);
            setCurrentUser(result);
            await fetchAnnouncements(result);
          } catch (error) {
            console.log(error);
            console.log("User not found");
          }
        };
        
        const fetchAnnouncements = async (user) => {
          try {
              const response = await GetWithAuth("/company/" + user.companyid + "/announcements");
              const result = await response.json();
              console.log(result);
              setAnnouncements(result);
          } catch (error) {
              console.log(error);
              console.log("announcement not found");
          }
      };
  
      
      fetchCompany();
         
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
        makeAnnouncement();
    };

    const makeAnnouncement = () => {
        fetch("/company/" + currentUser.companyid + "/makeAnnouncement", {
          method: 'POST',
          body: JSON.stringify({
            title: newTitle,
            description: newDescription
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
          }
          return response;
        })
        .then(result => {
          console.log(result);
          alert("Announcement saved. Waiting for the approval of the internship committee coordinator.");
          window.location.reload();
        })
        .catch(err => {
          console.error("Error occurred:", err);
          alert("Announcement upload is unsuccessful");
        });
    }

    const deleteAnnouncement = () => {
        fetch("/company/" + currentUser.companyid + "/deleteAnnouncement?announcementId=" + announcements[showDeletePopup.index].id, {
            method: 'DELETE',
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
            alert("Announcement deleted successfully");
            window.location.reload();
            console.log(result);
        })
        .catch(err => {
            console.error("Error occurred:", err);
            alert("Error occurred:", err);
        });
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => ({ ...prev, newAnn: !prev.newAnn }));
    };

    const handleAnnouncementClick = (index) => {
        setSelectedAnnouncement(selectedAnnouncement === index ? null : index);
    };

    const confirmDeleteAnnouncement = () => {
        deleteAnnouncement();
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
                                <p>Date: {announcement.uploadDate}</p>
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
