import React, { useState } from "react";

const initialStudentList = [
  { name: "Ahmet Öz" },
  { name: "Ayşe Yılmaz" },
  { name: "Beyza Yurdakan" },
  { name: "Duru Çiçek" },
  { name: "Ege Turanoğlu" },
  { name: "Elif Demir" },
  { name: "Esma İrem Tek" },
  { name: "Esra Ekmekci" },
  { name: "Fatma Kar" },
  { name: "Hasan Çoban" },
  { name: "Kağan Aslancan" },
  { name: "Mehmet Kaya" },
];

export default function Students({ studentList = initialStudentList }) {
  const [students, setStudents] = useState(studentList);

  const handleUpload = (student) => {
    alert(`Uploading a file for ${student.name}`);
  };

  const handleDelete = (studentToDelete) => {
    setStudents(students.filter((student) => student !== studentToDelete));
  };

  const handleDownload = () => {
    // 
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(students, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "students.json";
    document.body.appendChild(element); 
    element.click();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px 20px",
        width: "100%",
        borderRadius: "10px",
        overflowY: "auto"
      }}
    >
      <div style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between", paddingInline: "8px" }}>
        <h1 style={{color: "", fontSize: "24px"}}>Students</h1>
        <button
          onClick={handleDownload}
          style={{
            padding: "10px 20px",
            backgroundColor: "rgb(153, 27, 27)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#a71d2a")}
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "rgb(153, 27, 27)")
          }
        >
          Download Student List
        </button>
      </div>
      {students.map((student, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              flex: 1,
              fontWeight: "600",
              height: "40px",
              paddingInline: "10px",
              display: "flex",
              alignItems: "center",
              border: "1px solid #ced4da",
              borderRadius: "5px",
              marginRight: "10px",
            }}>
            {student.name}
          </div>
          <input
            type="file"
            id={`upload-${index}`}
            style={{ display: "none", height: "40px" }}
            onChange={() => handleUpload(student)}
          />
          <label
            htmlFor={`upload-${index}`}
            style={{
              padding: "10px",
              backgroundColor: "rgb(153, 27, 27)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: "5px",
              transition: "background-color 0.3s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#a71d2a")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgb(153, 27, 27)")
            }
          >
            Upload
          </label>
          <button
            onClick={() => handleDelete(student)}
            style={{
              padding: "10px",
              height: "40px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a6268")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
