import React, { useState } from 'react';
import '../../Pages/Coordinator/CoordinatorProfile.css';
import profile_icon from '../../Components/Assets/profile-picture.png'
import { useUser } from '../../Components/UserContext';


export default function CoordinatorProfileV2() {
    const { user } = useUser();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
    const handleChangePassword = (e) => {
        e.preventDefault();
       
        //Password change logic eklenip backende bağlanacak

        console.log("Password change requested.");
    };

    return(
            <div className="" style={{width: '100%', padding: '40px'}}>
                <div className="profile-section">
                    <img src={profile_icon} alt="" className="profile-icon" />
                    <h2>Coordinator Profile</h2>
                    
                    <div className="profile-item">
                        <label><b>Coordinator Name:</b> {user.name}</label>
                    </div>
                    <br />
                    <div className="profile-item">
                        <label><b>Coordinator Email:</b> {user.email}</label>
                    </div>
                    <br /><br />

                    <form onSubmit={handleChangePassword}>
                    <div className="setting-item">
                    <label>Current Password: <div><input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    /></div> </label>
                    
                    </div><br/>
                    <div className="setting-item">
                    <label>New Password: <div><input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    /></div> </label>
                    
                    </div><br/>
                    <div className="setting-item">
                    <label>Confirm New Password: <div><input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    /></div> </label>
                    
                    </div>
                    <br />
                    <button type="submit" style={{marginTop:'15px'}} className='iyte-bg'>Change Password</button>
                </form>
                </div>
            </div>
    );
}
