  import React, { useEffect, useState } from 'react';
  import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
  import Home from './components/View/Home';
  import Student from './components/View/Login.js/Student/Student';
  import Teacher from './components/View/Login.js/Teacher/Teacher';
  import Register from './components/View/Login.js/Student/Register';
  import Dashboard from './components/View/Login.js/Student/Dashboard/Dashboard';
  import Profile from './components/View/Login.js/Student/Dashboard/Profile/Profile';
  import Admin from './components/View/Login.js/Admin/Admin';
  import AdminDash from './components/View/Login.js/Admin/AdminDash/AdminDash';

  // Utility to check if enrollment cookie exists
  const isUserLoggedIn = () => {
    const cookies = document.cookie.split(';').map(c => c.trim());
    return cookies.some(c => c.startsWith('enrollment='));
  };

  const AppRoutes = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      setIsLoggedIn(isUserLoggedIn());
    }, [location]); // re-check cookie when route changes

    

    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={!isLoggedIn ? <Student /> : <Navigate to="/dashboard" />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/admin" element={!isLoggedIn ? <Admin /> : <Navigate to="/AdminDash" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/student" />} />
        <Route path="/admindash" element={isLoggedIn ? <AdminDash /> : <Navigate to="/admin" />} />
      </Routes>
    );
  };

  const App = () => {
    return (
      <Router basename="/student-teacher-booking-appointment">
        <div className="content">
          <AppRoutes />
        </div>
      </Router>
    );
  };

  export default App;
