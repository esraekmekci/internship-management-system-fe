import React, { useState, useEffect } from 'react';
import CompanyHome from './CompanyHome.js';
import './CompanyInterns.css';

function CompanyInterns() {
    const [interns, setInterns] = useState([]);
    const [selectedIntern, setSelectedIntern] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const sampleInterns = [
            { id: 1, name: "Alice Johnson", applicationFormUrl: "https://example.com/path/to/alice.pdf", formStatus: "Partially filled" },
            { id: 2, name: "Bob Smith", applicationFormUrl: "https://example.com/path/to/bob.pdf", formStatus: "Partially filled" },
        ];
        setInterns(sampleInterns);
    }, []);

    const handleSelectIntern = (intern) => {
        if (selectedIntern === intern && !uploading) {
            setSelectedIntern(null);
        } else {
            setSelectedIntern(intern);
        }
    };

    const handleUploadClick = (e) => {
        e.stopPropagation(); // Prevents the onClick event of the parent div from being triggered
        setUploading(!uploading); // Toggle uploading state based on current state
    };

    const handleFileChange = (event) => {
        event.stopPropagation(); 
        setSelectedFile(event.target.files[0]);
    };

    const downloadForm = () => {
        alert("Application Form Downloaded Successfully");
    };

    const handleSubmitUpload = (e) => {
        e.stopPropagation(); 
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }
        alert(`Uploaded successfully for ${selectedIntern.name}`);
        setUploading(false);
        setSelectedFile(null);
    };

    const handleCancelUpload = (e) => {
        e.stopPropagation(); 
        setUploading(false);
        setSelectedFile(null);
    };

    return (
        <CompanyHome>
            <div className="announcement-section" style={{ marginTop: '60px' }}>
                <h1>My Interns</h1>
            </div>
            {interns.length > 0 ? (
                interns.map((intern) => (
                    <div key={intern.id} className="announcement-section" onClick={() => handleSelectIntern(intern)}>
                        <h2>{intern.name}<span style={{ float: 'right', fontSize: '15px' }}>Status: {intern.formStatus}</span></h2>
                        {selectedIntern === intern && (
                            <div>
                                <button onClick={downloadForm}>Download Form</button><br />
                                <div>
                                    <button onClick={handleUploadClick}>Upload Form</button>
                                    {uploading && (
                                        <div className="new-announcement-form">
                                            <input type="file" onChange={handleFileChange} style={{ margin: '10px' }}/>
                                            <button onClick={handleSubmitUpload}>Submit</button>
                                            <button onClick={handleCancelUpload}>Cancel</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No students with partially filled forms. Please check back later.</p>
            )}
        </CompanyHome>
    );
}

export default CompanyInterns;
