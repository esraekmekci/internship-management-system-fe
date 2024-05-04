import React from "react";
import iyte_icon from "../Components/Assets/iyte-logo.png";

function Logout() {
    const boxStyle = {
        display: 'flex', // Use Flexbox for layout
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        height: '100vh', // Make div take up the full viewport height
        width: '100vw', // Make div take up the full viewport width
    };

    const messageStyle = {
        padding: '20px',
        border: '1px solid #000', // Simple solid border
        borderRadius: '5px', // Slightly rounded corners for the box
        backgroundColor: '#f0f0f0', // Light grey background for the message box
        fontSize: '20px', // Increase font size for visibility
    };

    return (
        
        <div style={boxStyle}>
            <div style={messageStyle}>
                You have been logged out
            </div>
            
        </div>
    );
}

export default Logout;
