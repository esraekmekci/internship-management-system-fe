import React, { useState, useEffect } from "react";
import { useUser } from "../../Components/UserContext";

export default function DocumentsV2() {
  const { user } = useUser();

  const downloadFile = (fileName) => {
    // Burada dosyayı indirmek için uygun bir işlem yapılabilir.
    if (fileName === "Guideline") {
      downloadGuideline();
    } else if (fileName === "SGK") {
      downloadSGKDocument();
    } else {
      alert("File not found!");
    }
  };

  const downloadSGKDocument = () => {
    fetch("/student/" + user.studentID + "/downloadSGKDocument", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.blob(); // Yanıtı blob olarak al
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Blob'dan bir URL oluştur
        const a = document.createElement("a"); // Yeni bir anchor elementi oluştur
        a.href = url;
        a.download = "SGK_Report_" + user.studentID + ".pdf"; // İndirilecek dosyanın adını belirle
        document.body.appendChild(a); // Anchor elementini document'e ekle
        a.click(); // Programatik olarak tıklayarak indirme işlemini başlat
        a.remove(); // Anchor elementini temizle
        window.URL.revokeObjectURL(url); // Oluşturulan URL'i iptal et
        alert(`SGK Report downloaded successfully`);
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert(`SGK Report download is unsuccessful`);
      });
  };

  const downloadGuideline = () => {
    fetch("/coordinator/downloadGuideline", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.blob(); // Yanıtı blob olarak al
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Blob'dan bir URL oluştur
        const a = document.createElement("a"); // Yeni bir anchor elementi oluştur
        a.href = url;
        a.download = "Guideline.pdf"; // İndirilecek dosyanın adını belirle
        document.body.appendChild(a); // Anchor elementini document'e ekle
        a.click(); // Programatik olarak tıklayarak indirme işlemini başlat
        a.remove(); // Anchor elementini temizle
        window.URL.revokeObjectURL(url); // Oluşturulan URL'i iptal et
        alert(`Guideline downloaded successfully`);
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert(`Guideline download is unsuccessful`);
      });
  };

  return (
    <div className="w-full-padding">
      <div
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div className="shadow-sm p-sm">
          <div
            className="title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "1p",
            }}
          >
            Summer Practice Guideline
            <button className="iyte-bg" onClick={() => downloadFile("Guideline")}>
              Download
            </button>
          </div>
        </div>
        <div className="shadow-sm p-sm">
          <div
            className="title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "1p",
            }}
          >
            SGK Report
            <button className="iyte-bg" onClick={() => downloadFile("SGK")}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
