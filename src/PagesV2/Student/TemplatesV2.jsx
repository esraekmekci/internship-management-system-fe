import React, { useState } from "react";

export default function TemplatesV2() {
  const downloadFile = (fileName) => {
    const anchor = document.createElement("a");
    anchor.style.display = "none";

    const downloadUrl = "https://ims-api-esraekmekci-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/download/" + fileName;

    anchor.href = downloadUrl;

    anchor.setAttribute("download", fileName);

    document.body.appendChild(anchor);

    anchor.click();
  };

  return (
    <div className="w-full-padding">
      <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
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
            Summer Practice Application Letter (TR)
            <button
              className="iyte-bg"
              onClick={() =>
                downloadFile("1_TR_SummerPracticeApplicationLetter2023.docx")
              }
            >
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
            }}
          >
            Summer Practice Application Letter (EN)
            <button
              className="iyte-bg"
              onClick={() =>
                downloadFile("1_EN_SummerPracticeApplicationLetter2023.docx")
              }
            >
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
            }}
          >
            Summer Practice Application Form (TR)
            <button
              className="iyte-bg"
              onClick={() =>
                downloadFile("2_TR_SummerPracticeApplicationForm2023.doc")
              }
            >
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
            }}
          >
            Company Form (TR)
            <button
              className="iyte-bg"
              onClick={() => downloadFile("3_TR_FirmaFormu2023.docx")}
            >
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
            }}
          >
            Summer Practice Report Template (TR)
            <button
              className="iyte-bg"
              onClick={() =>
                downloadFile("4_SummerPracticeReportTemplate_Word2023.docx")
              }
            >
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
            }}
          >
            Summer Practice Student Questionnaire (EN)
            <button
              className="iyte-bg"
              onClick={() =>
                downloadFile(
                  "5_EN_SummerPracticeStudentQuestionnaire_Word.docx"
                )
              }
            >
              Download
            </button>
          </div>
        </div>
        <div className="shadow-sm p-sm" >
          <div
            className="title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Summer Practice Student Questionnaire (TR)
            <button
              className="iyte-bg"
              onClick={() =>
                downloadFile("5_TR_StajÖğrenciAnketi_Word2023.docx")
              }
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
