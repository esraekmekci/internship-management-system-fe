import React, { useState, useEffect } from "react";
import { GetWithAuth } from "../../Services/HttpService";
import "../../Pages/Company/CompanyAnnouncement.css";
import Loading from "../../Pages/LoadingPage";
import { useUser } from "../../Components/UserContext.jsx";

export default function CompanyAnnouncementV2() {
  const {user} = useUser();
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [showDropdown, setShowDropdown] = useState({ newAnn: false });
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [showDeletePopup, setShowDeletePopup] = useState({
    show: false,
    index: null,
  });

  useEffect(() => {

    const fetchAnnouncements = async () => {
      try {
        const response = await GetWithAuth(
          "/api/company/" + user.companyid + "/announcements"
        );
        const result = await response.json();
        setAnnouncements(result);
      } catch (error) {
        console.log(error);
        console.log("announcement not found");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
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
    fetch("/api/company/" + user.companyid + "/makeAnnouncement", {
      method: "POST",
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response;
      })
      .then((result) => {
        alert(
          "Announcement saved. Waiting for the approval of the internship committee coordinator."
        );
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error occurred:", err);
        alert("Announcement upload is unsuccessful");
      });
  };

  const deleteAnnouncement = () => {
    fetch(
      "/api/company/" +
      user.companyid +
        "/deleteAnnouncement?announcementId=" +
        announcements[showDeletePopup.index].id,
      {
        method: "DELETE",
        headers: {},
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response;
      })
      .then((result) => {
        alert("Announcement deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
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
    <div className="w-full-padding">
      <div>
        <h1 style={{ marginBottom: "4px" }}>Announcements</h1>
      </div>
              <div className="" style={{ marginTop: "15px" }}>
                <button
                  onClick={() => toggleDropdown("newAnn")}
                  style={{ display: "block" }}
                  className="green-bg"
                >
                  New Announcement
                </button>
                {showDropdown.newAnn && (
                  <div
                    style={{
                      maxWidth: "500px",
                      backgroundColor: "#f8f8f8",
                      borderRadius: "10px",
                      padding: "20px 30px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <input
                      className="v2 border-rounded"
                      type="text"
                      placeholder="Enter Announcement Title"
                      value={newTitle}
                      style={{
                        marginLeft: "0px",
                        width: "600px",
                        padding: "8px 10px",
                        fontSize:'16px',
                        border: "1px #ccc solid",
                      }}
                      onChange={handleNewTitleChange}
                    />
                    <br></br>
                    <textarea
                      className="v2 border-rounded"
                      placeholder="Enter Announcement Description"
                      value={newDescription}
                      style={{ marginLeft: "0px", width: "600px", padding: "8px 10px", fontSize:'14px' , height:'150px', overflow:'auto'}}
                      onChange={handleNewDescriptionChange}
                    ></textarea>
                    <button
                      className="iyte-bg"
                      onClick={handleNewAnnouncement}
                      style={{ alignSelf: "end", marginRight: "-8px" }}
                    >
                      Enter
                    </button>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                  </div>
                )}
              </div>
        <Loading isLoading={loading} />
      <div>
        {announcements &&
          announcements.map((announcement, index) => (
            <div
            key={index}
            className=""
              style={{
                border: ".5px solid #ccc",
                padding: "25px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
              }}
              >
              <h2
                onClick={() => handleAnnouncementClick(index)}
                style={{ cursor: "pointer", color: "rgba(45, 51, 69)" }}
              >
                {announcement.title}
                <span style={{ float: "right", fontSize: "15px" }}>
                  Status: {announcement.status}
                </span>
              </h2>
              {selectedAnnouncement === index && (
                <>
                  <p>{announcement.description}</p>
                  <p>Date: {announcement.uploadDate}</p>
                  {announcement.file && <p>File: {announcement.file}</p>}
                  <button
                    className="iyte-bg"
                    onClick={() => handleDeleteClick(index)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
      </div>


      {showPopup && (
        <div className="popup">
          <h2>Confirm New Announcement</h2>

          <div
            style={{ textAlign: "left", overflowY: "auto", maxHeight: "350px" }}
          >
            <p>Title: {newTitle}</p>
            <p>Description: {newDescription}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={confirmNewAnnouncement}>Yes</button>
            <button onClick={() => setShowPopup(false)}>No</button>
          </div>
        </div>
      )}

      {showDeletePopup.show && (
        <div
          className="popup-v2"
          style={{ top: "20%", right: "50%", left: "40%" }}
        >
          <h2>Are you sure you want to delete this announcement?</h2>
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <button className="green-bg" onClick={confirmDeleteAnnouncement}>Yes</button>
            <button className="iyte-bg"
              onClick={() => setShowDeletePopup({ show: false, index: null })}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
