import React, { useState } from 'react';
import './CoordinatorGrades.css';
import CoordinatorHome from './CoordinatorHome';

/*
Coordinator Companies ile değiştirildi hiçbir şekilde bu sayfaya ulaşılamıyor şu an
Belki ilerde lazım olur diye silmedim
*/

function CoordinatorGrades() {
    const [documentType, setDocumentType] = useState('');

    const handleDocumentTypeChange = (event) => {
        setDocumentType(event.target.value);
    };

    const handleDownload = (event) => {
        event.preventDefault();
        if (documentType) {
            // Dummy dowload (değiştirelecek)
            alert(`Downloading grade list as: ${documentType}`);
        } else {
            alert('Please select a document type.');
        }
    };

    return (
        <CoordinatorHome>
            <div className="coordinator-grades">
                <h2>Download Grade List</h2>
                <form onSubmit={handleDownload}>
                    <label htmlFor="documentType">Select Document Type:</label>
                    <select id="documentType" value={documentType} onChange={handleDocumentTypeChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="PDF">PDF</option>
                        <option value="Excel">Excel</option>
                    </select>
                    <button type="submit">Download</button>
                </form>
            </div>
        </CoordinatorHome>
    );
}

export default CoordinatorGrades;
