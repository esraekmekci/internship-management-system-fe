import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Guidelines.css';
import CoordinatorHome from './CoordinatorHome';

function Guidelines() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [announcementMade, setAnnouncementMade] = useState(false);

    const handleFileChange = event => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setFile(file);
            setPreview(URL.createObjectURL(file));
        } else {
            alert("Please select a PDF file.");
            event.target.value = null;
        }
    };

    const handleAnnounce = () => {
        if (!file) {
            alert("No file selected. Please choose a PDF file to announce.");
            return;
        }
        console.log("File uploaded:", file);
        setAnnouncementMade(true);
        alert("Announcement successfully made.");
    };

    const handleCancel = () => {
        setFile(null);
        setPreview('');
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this guideline?")) {
            setFile(null);
            setPreview('');
            setAnnouncementMade(false);
            alert("Announcement deleted.");
        }
    };

    return (
        <CoordinatorHome>
            <div className="guidelines">
                <h2 className="upload-title">Please Upload a File (.pdf)</h2>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                {file && (
                    <div>
                        <button onClick={handleCancel} className="cancel-button">Cancel</button>
                        <button onClick={handleDelete} className="delete-button">Delete Guideline</button>
                        <h3>Preview:</h3>
                        <iframe src={preview} title="Document Preview" className="preview"></iframe>
                    </div>
                )}
                <button onClick={handleAnnounce}>Announce</button>
                {announcementMade && <p>Announcement made.</p>}
            </div>
        </CoordinatorHome>
    );
}

export default Guidelines;
