import React, { useState } from 'react';
import '../../Pages/Coordinator/CoordinatorProfile.css';
import CoordinatorHome from './CoordinatorHomeV2.jsx';
import profile_icon from '../../Components/Assets/profile-picture.png'


export default function CoordinatorProfileV2() {

    const [userName, setUserName] = useState('-'); // Backende bağlanacak
    const [userEmail, setUserEmail] = useState('-'); // Backende bağlanacak

    return(
            <div className="" style={{width: '100%', padding: '40px'}}>
                <div className="profile-section">
                    <img src={profile_icon} alt="" className="profile-icon" />
                    <h2>User Profile</h2>
                    
                    <div className="profile-item">
                        <label>User Name: <div>{userName}</div></label>
                    </div>
                    
                    <div className="profile-item">
                        <label>User Email:<div>{userEmail}</div></label>
                    </div>
                </div>
            </div>
    );
}
