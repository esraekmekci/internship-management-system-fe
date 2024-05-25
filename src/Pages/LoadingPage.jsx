import React from 'react';
import loading_icon from '../Components/Assets/loading.gif';
import './Home.css';

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-container">
      <img src={loading_icon} alt="loading" className="loading-img" />
    </div>
  );
};

export default Loading;