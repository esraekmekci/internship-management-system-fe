# Internship Management System
This repository contains the front-end source code and documentation for our IMS web application, designed to streamline and automate the internship process for students, company representatives, and computer engineering department at İzmir Institute of Technology (IZTECH).

## Project Overview

### Purpose
The purpose of the Internship Management System is to replace the current manual, paper-based internship application and management process with an automated online system. This will simplify and expedite the workflow, making it more efficient and user-friendly for all parties involved.

### Scope
The system includes interfaces for students, company representatives, and faculty members such as internship coordinator and department secretary. Students can apply for internships and track their application status. Company representatives can post internship opportunities and manage applications. The internship coordinator can oversee and verify the internship process and manages the approval of companies that want to register and post opportunities on the system. The department secretary reviews the eligibility of students and downloads list of students who require SSI employment document and uploads these documents to the system. The system integrates with IZTECH's existing platforms such as UBYS.

### Features

- **User Management:** Handles different roles such as students, company representatives, coordinators, and secretaries.
- **Internship Applications:** Allows students to apply for internships and track their progress.
- **Document Management:** Facilitates the uploading and management of necessary documents.
- **Opportunities:** Enables company representatives to post internship opportunities.
- **Guidelines:** Enables internship coordinators to post guidelines for the internship process.

### Technology Stack

- **Frontend:** ReactJS for creating an interactive and responsive user interface. Vercel for deploying front-end.
- **Backend:** Java Spring Boot for building robust backend services. JWT for securing API endpoints and managing user sessions. Docker and Red Hat OpenShift for creating images and deploying back-end.
- **Database:** MySQL hosted on AWS RDS, offers reliability, ACID compliance, scalability, and robustness. JPA (Java Persistence API) and Hibernate provides a bridge between the relational database and the Java application.
- **Storage:** Amazon S3 for document storage, download and upload operations.

## Acknowledgement
This project is developed by Group 2 of the CENG323 (Project Management) and CENG316 (Software Engineering) courses in İzmir Institute of Technology. Special thanks to our instructors and peers for their support and guidance.
