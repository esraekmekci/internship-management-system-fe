import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,
RouterProvider, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Logout from './Pages/Logout';
import UserSettings from './Pages/UserSettings';
import Profile from './Pages/Profile';  
import Companies from './Pages/Companies'; 
import ApplyInternship from './Pages/ApplyInternship';
import UploadSummerPractice from './Pages/UploadSummerPractice';
import SecretaryHome from './Pages/Secretary/SecretaryHome';
import SecretaryUserSettings from './Pages/Secretary/SecretaryUserSettings';
import Announcement from './Pages/Announcement'; 
import Documents from './Pages/Documents';
import Applications from './Pages/Applications';
import Templates from './Pages/Templates';
import CoordinatorHome from './Pages/Coordinator/CoordinatorHome';
import CoordinatorAnnouncement from './Pages/Coordinator/CoordinatorAnnouncement';
import CoordinatorStudents from './Pages/Coordinator/CoordinatorStudents';
import Guidelines from './Pages/Coordinator/Guidelines';
import CoordinatorSettings from './Pages/Coordinator/CoordinatorSettings';
import CoordinatorProfile from './Pages/Coordinator/CoordinatorProfile';
import CompanyHome from  './Pages/Company/CompanyHome';
import CompanyProfile from  './Pages/Company/CompanyProfile';
import CompanySettings from  './Pages/Company/CompanySettings';
import CompanyStudents from  './Pages/Company/CompanyStudents';
import CompanyAnnouncements from  './Pages/Company/CompanyAnnouncements';
import CompanyInterns from  './Pages/Company/CompanyInterns';
import CoordinatorCompanies from './Pages/Coordinator/CoordinatorCompanies';
import SecretaryHomeV2 from './Pages/Secretary/SecretaryHomeV2';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'log_out',
    element: <Logout />,
  },
  {
    path: 'user_settings',
    element: <UserSettings />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'companies',
    element: <Companies />,
  },
  {
    path: 'apply',
    element: <ApplyInternship />,
  },
  {
    path: 'upload_summer_practice',
    element: <UploadSummerPractice />,
  },
  {
    path: 'sec_home',
    element: <SecretaryHome />
    
  },
  {
    path: 'secretary',
    element: <SecretaryHomeV2 />,
    children: [
      {
        path: '',
        element: '',
      },

      {
        path: 'settings',
        element: <SecretaryUserSettings />
      },

    ]
  },
  {
    path: 'announcement',
    element: <Announcement/>,
  },
  {
    path: 'documents',
    element: <Documents/>,
  },
  {
    path: 'applications',
    element: <Applications/>,
  },
  {
    path: 'templates',
    element: <Templates/>,
  },
  {
    path: 'coor_home',
    element: <CoordinatorHome />,
  },
  {
    path: 'coor_announcements',
    element: <CoordinatorAnnouncement />,
  },
  {
    path: 'coor_students',
    element: <CoordinatorStudents />,
  },
  {
    path: 'guidelines',
    element: <Guidelines />,
  },
  {
    path: 'coor_settings',
    element: <CoordinatorSettings />,
  },
  {
    path: 'coor_profile',
    element: <CoordinatorProfile />,
  },
  {
    path: 'comp-home',
    element: <CompanyHome />,
  },  
  {
    path: 'comp-profile',
    element: <CompanyProfile />,
  },  
  {
    path: 'comp-settings',
    element: <CompanySettings />,
  },
  {
    path: 'comp-announcements',
    element: <CompanyAnnouncements />,
  },
  {
    path: 'comp-students',
    element: <CompanyStudents />,
  },
  {
    path: 'comp-interns',
    element: <CompanyInterns />,
  },
  {
    path: 'coor_companies',
    element: <CoordinatorCompanies />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <RouterProvider router={router} />
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
