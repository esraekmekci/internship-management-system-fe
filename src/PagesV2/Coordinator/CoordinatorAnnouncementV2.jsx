import React, { useState, useEffect } from "react";
import { GetWithAuth } from "../../Services/HttpService";
import { PutWithAuth } from "../../Services/HttpService";

import "../../Pages/Coordinator/CoordinatorAnnouncement.css";
import CoordinatorHome from "./CoordinatorHomeV2";

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
            `/coordinator/approveAnnouncement?announcementId=${announcement.announcement_id}`
          );
          alert("Announcement is made.");
        } else {
          await PutWithAuth(
            `/coordinator/rejectAnnouncement?announcementId=${announcement.announcement_id}`
          );
          alert("Announcement is rejected.");
        }
      },
      reject: async () => {
        await PutWithAuth(
          `/coordinator/rejectAnnouncement?announcementId=${announcement.announcement_id}`
        );
        alert("Announcement is rejected.");
      },
    };
    actions[type]();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetWithAuth("/announcement");
        const result = await response.json();
        console.log(result);
        setAnnouncements(result);
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
    <div className="" style={{ width: "100%", padding: "20px 40px" }}>
      <h1>Announcements</h1>
      <div className="announcement-underline"></div>
      {announcements.map((announcement) => (
        <div key={announcement.announcement_id} className="announcement-item">
          <h2>{announcement.comp_name + " - " + announcement.status}</h2>
          <button
            onClick={() => handleViewClick(announcement)}
            style={{
              backgroundColor:
                selectedAnnouncement &&
                selectedAnnouncement.announcement_id ===
                  announcement.announcement_id
                  ? "#007BFF"
                  : "#4CAF50",
              color: "white",
            }}
          >
            View
          </button>
          <div className="announcement-mini-underline"></div>
          {selectedAnnouncement &&
            selectedAnnouncement.announcement_id ===
              announcement.announcement_id && (
              <div className="announcement-details">
                <h2>{announcement.title}</h2>
                <p>{announcement.description}</p>
                <button
                  className="btn"
                  onClick={() => handleAction("approve", announcement)}
                >
                  Approve
                </button>
                <button onClick={() => handleAction("reject", announcement)}>
                  Reject
                </button>
              </div>
            )}
        </div>
      ))}
      {showModal && (
        <Modal
          message={modalConfig.message}
          onClose={modalConfig.onClose}
          onConfirm={modalConfig.onConfirm}
        />
      )}
    </div>
  );
}
