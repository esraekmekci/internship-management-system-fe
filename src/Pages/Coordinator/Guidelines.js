import React, { useState,   useEffect} from 'react';
import './Guidelines.css';
import CoordinatorHome from './CoordinatorHome';
import { GetWithAuth } from "../../Services/HttpService.js";

const file = [
  { name: 'Summer Practice Guidelines'},
];

function Guidelines() {
    const [files, setFiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedFile(selectedFile);
        }
      };

    const handleDownload = () => {
        fetch("/coordinator/downloadGuideline", {
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
          a.download = "SummerPracticeGuidelines.pdf"; // İndirilecek dosyanın adını belirle
          document.body.appendChild(a); // Anchor elementini document'e ekle
          a.click(); // Programatik olarak tıklayarak indirme işlemini başlat
          a.remove(); // Anchor elementini temizle
          window.URL.revokeObjectURL(url); // Oluşturulan URL'i iptal et
          alert(`Guideline downloaded successfully`);
        })
        .catch(err => {
          console.error("Error occurred:", err);
          alert(`Guideline download is unsuccessful`);
        });
      };

      const deleteGuidelines = () => {
        fetch("/coordinator/deleteGuidelines", {
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
            alert("Guideline deleted successfully");
            window.location.reload();
            console.log(result);
        })
        .catch(err => {
            console.error("Error occurred:", err);
            alert("Error occurred:", err);
        });
    };
  
      const handleUpload = (event) => {
        event.preventDefault();
        if (!selectedFile) {
          alert('Please select a file first!');
          return;
        }
        const fileExtension = selectedFile.name.split('.').pop();
        if (fileExtension.toLowerCase() !== 'pdf') {
          alert('Please select a PDF file!');
          return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
      
        uploadGuideline(formData);
      
        console.log("Sending request to upload file");
      };
  
      const uploadGuideline = (formData) => {
        fetch("/coordinator/uploadGuidelines", {
          method: 'POST',
          body: formData,
          headers: {
            // Don't set 'Content-Type': 'multipart/form-data',
            // Fetch will set it automatically along with the boundary
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
          alert("Guideline uploaded successfully");
          setShowModal(false);
          window.location.reload();
        })
        .catch(err => {
          console.error("Error occurred:", err);
          alert("Guideline upload is unsuccessful.");
        });

    
    }
        
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await GetWithAuth("/coordinator/checkGuideline");
            const exists = await response.json(); // Assuming the response is JSON and 'exists' is a boolean
            console.log(exists); // This should log true or false
            if (exists === true) {
                setFiles(file)
                console.log("Success");
            } else {
                console.log("File does not exist.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
        };
    
        const timeout = setTimeout(() => {
            fetchData();
        }, 1);
    
        return () => clearTimeout(timeout);
    
    }, []);
      
    



    return (
        <CoordinatorHome>
            <div className="guidelines">
                <h2 className="upload-title">Upload Guidelines</h2>
                <button className="upload-button" onClick={() => setShowModal(true)}>
                    Upload Document
                </button>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowModal(false)}>
                                &times;
                            </span>
                            <h3>Select a PDF file to upload</h3>
                            <input type="file" accept="application/pdf" onChange={handleFileChange} />
                            {previewUrl && <embed src={previewUrl} width="400" height="500" type="application/pdf" />}
                            <button className="upload-button" onClick={handleUpload} disabled={!selectedFile}>
                                Upload
                            </button>
                        </div>
                    </div>
                )}
                <ul className="file-list">
                    {files.map((file, index) => (
                        <li key={index} className="file-item">
                            <div className="file-info">
                                <span className="file-name">{file.name}</span>
                            </div>
                            <div className="file-buttons">
                                <button className="download-button" onClick={() => handleDownload()}>
                                    Download
                                </button>
                                <button className="delete-button" onClick={() => deleteGuidelines()}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </CoordinatorHome>
    );
}

export default Guidelines;
