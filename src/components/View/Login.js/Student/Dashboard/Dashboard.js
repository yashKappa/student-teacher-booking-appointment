import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Navbar/Navbar';
import Home from '../../../Home';

const Dashboard = () => {
  return (
    <div className="section dashboard-section">
        <Navbar />
        <Home />
    </div>
  );
};

export default Dashboard;
