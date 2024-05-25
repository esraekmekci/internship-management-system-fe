import React, { useState, useEffect } from "react";
import { GetWithAuth } from "../../Services/HttpService";
import { PutWithAuth } from "../../Services/HttpService";
import Loading from "../../Pages/LoadingPage";
import '../../Pages/Home.css';
import "../../Pages/Coordinator/CoordinatorAnnouncement.css";

function Modal({ onClose, onConfirm, message }) {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
}

export default function CoordinatorAnnouncementV2() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleViewClick = (announcement) => {
    if (
      selectedAnnouncement &&
      selectedAnnouncement.announcement_id === announcement.announcement_id
    ) {
      setSelectedAnnouncement(null);
    } else {
      setSelectedAnnouncement(announcement);
    }
  };

  const handleAction = (type, announcement) => {
    const actions = {
      approve: async () => {
        //Kullanıcıya mesaj gösterme
        if (
          window.confirm(
            "Are you sure, the announcement will be posted to all students?"
          )
        ) {
          await PutWithAuth(
            `/api/coordinator/approveAnnouncement?announcementId=${announcement.announcement_id}`
          );
          alert("Announcement is made.");
          window.location.reload();
        }
      },

      reject: async () => {

        if (
          window.confirm(
            "Are you sure? The announcement will be rejected. You can still change it later."
          )
        ) {
          await PutWithAuth(
            `/api/coordinator/rejectAnnouncement?announcementId=${announcement.announcement_id}`
          );
          alert("Announcement is rejected.");
          window.location.reload();
        } 
      },
    };
    actions[type]();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetWithAuth("/api/announcement");
        const result = await response.json();
        console.log(result);
        setAnnouncements(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        console.log("ann not found");
      }
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 1);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="" style={{ width: "100%", padding: "20px 40px", overflowY: "auto" }}>
      <h1 style={{ marginBottom: "4px" }}>Announcements</h1>
      <Loading isLoading={loading} /> 
      <div>
      <div>
        {announcements &&
          announcements.map((announcement) => (
            <div
              key={announcement.announcement_id}
              className="announcement-section"
              style={{
                padding: "15px 30px",
                borderBottom: "1px solid #fafafa",
              }}
            >
              <h2
                onClick={() => handleViewClick(announcement)}
                style={{ cursor: "pointer", color: "rgba(45, 51, 69)" }}
              >
                {announcement.title}
                <span style={{ float: "right", fontSize: "15px" }}>
                  Status: {announcement.status}
                </span>
              </h2>
              {selectedAnnouncement &&
            selectedAnnouncement.announcement_id ===
              announcement.announcement_id && (
                <div className="announcement-details">
                  <h4>{announcement.comp_name}</h4>
                  <p>{announcement.description}</p>
                  <p>{announcement.date}</p>
                
                {(selectedAnnouncement.announcement.status !== 'approved' || 
                selectedAnnouncement.announcement.status !== 'rejected') &&(
                  <div>
                  <button
                    className="btn "
                    onClick={() => handleAction("approve", announcement)}
                  >
                    Approve
                  </button>
                  <button className="iyte-bg" onClick={() => handleAction("reject", announcement)}>
                    Reject
                  </button>
                </div>
                )}

                </div>
              )}
            </div>
          ))}
      </div>
      </div>
  </div>
  );
}
