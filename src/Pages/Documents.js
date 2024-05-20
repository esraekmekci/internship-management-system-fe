import React, { useState, useEffect } from 'react';
import Home from'./Home.js';

function Documents() {
    var [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
      console.log(currentUser.studentID); // currentUser her güncellendiğinde bu çalışır
    }, [currentUser]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await GetWithAuth("/student/token/" + localStorage.getItem("tokenKey"));
          const result = await response.json();
          console.log(result);
          setCurrentUser(result);
        } catch (error) {
          console.log(error);
          console.log("User not found");
        }
      };
      
      
      const timeout = setTimeout(() => {
        fetchData();
      }, 1); 
      
      
      return () => clearTimeout(timeout); // useEffect'in temizleme fonksiyonu, bileşen kaldırıldığında zamanlayıcıyı temizler
      
    }, []);

    const downloadFile = (fileName) => {
        // Burada dosyayı indirmek için uygun bir işlem yapılabilir.
        if (fileName === 'Guideline') {
          downloadGuideline();
        }
        else if (fileName === 'SGK') {
          downloadSGKDocument();
        }
        else {
          alert('File not found!');
        }
    };
    
    const downloadSGKDocument = () => {
      fetch("/student/" + currentUser.studentID + "/downloadSGKDocument", {
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
        a.download = "SGK_Report_" + currentUser.studentID + ".pdf"; // İndirilecek dosyanın adını belirle
        document.body.appendChild(a); // Anchor elementini document'e ekle
        a.click(); // Programatik olarak tıklayarak indirme işlemini başlat
        a.remove(); // Anchor elementini temizle
        window.URL.revokeObjectURL(url); // Oluşturulan URL'i iptal et
        alert(`SGK Report downloaded successfully`);
      })
      .catch(err => {
        console.error("Error occurred:", err);
        alert(`SGK Report download is unsuccessful`);
      });
    };

    //backend duzenlenince degisecek
    const downloadGuideline = () => {
      fetch("/student/" + currentUser.studentID + "/downloadSGKDocument", {
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
        a.download = "Guideline.pdf"; // İndirilecek dosyanın adını belirle
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
  
  return (
      
    
    <Home>
    <div className="announcement-section" style={{marginTop: '60px'}}>
    
        <div className="title">Summer Practice Guideline
        <button className="download-button"  onClick={() => downloadFile('Guideline')}>Download</button></div>
      </div>
      <div className="announcement-section">
      <div className="title">SGK Report
        <button className="download-button"  onClick={() => downloadFile('SGK')}>Download</button></div>
      
    </div>
    </Home>
  );
}

export default Documents;