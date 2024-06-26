import React, { useState } from 'react';
import './CoordinatorSettings.css';
import CoordinatorHome from './CoordinatorHome';
import settings_icon from '../../Components/Assets/settings.png';


function CoordinatorSettings() {

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
        <CoordinatorHome>
                <div className='announcement-section' style={{marginTop:'60px'}}>
                
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
                    <button type="submit" style={{marginTop:'15px'}}>Change Password</button>
                </form>
            </div>
        </CoordinatorHome>
    );
}
 
export default CoordinatorSettings;