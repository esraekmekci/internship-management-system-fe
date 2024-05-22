import React, { useState } from 'react';
import '../../Pages/Coordinator/CoordinatorSettings.css';
import CoordinatorHome from './CoordinatorHomeV2.jsx';
import settings_icon from '../../Components/Assets/settings.png';


export default function CoordinatorSettingsV2() {

    const [userName, setUserName] = useState('-'); // Backende bağlanacak
    const [userEmail, setUserEmail] = useState('-'); // Backende bağlanacak
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
    const handleChangePassword = (e) => {
        e.preventDefault();
       
        //Password change logic eklenip backende bağlanacak

        console.log("Password change requested.");
    };

    return(
            <div style={{ width: "100%", padding: '20px 40px'}}>
                <div className='' >
                
                <h2><img src={settings_icon} alt="Person" className="settings-icon" />  User Settings</h2>
                
                <div className="setting-item">
                    <label>User Name: <div>{userName}</div></label>
                
                </div>
                
                <div className="setting-item">
                    <label>User Email: <div>{userEmail}</div></label>
                    
                </div>

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
 
