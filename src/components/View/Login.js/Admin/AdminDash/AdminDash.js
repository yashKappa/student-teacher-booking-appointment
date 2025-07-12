import React, { useState, useEffect, useRef } from 'react';
import './AdminDash.css';
import StudentDash from './StudentDash/StudentDash';
import TeacherDash from './TeacherDash/TeacherDash';
import TeacherAdd from './TeacherDash/TeacherAdd';
import { useNavigate } from 'react-router-dom';

const AdminDash = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    document.cookie = 'adminAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

 return (
  <>
    {/* Mobile Navbar */}
    <div className="mobile-navbar">
      <span className="brand">S&T</span>
      <button className="menu-btn" onClick={toggleMenu}>☰</button>
    </div>

    <div className="admin-container">
      {/* Sidebar */}
      <div ref={sideMenuRef} className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <div className='header'>
          <h3>🛠 Admin Panel</h3>
        </div>
  <li className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => { setActiveSection('dashboard'); closeMenu(); }}><i class="fa-solid fa-table-columns"></i> Dashboard</li>
  <li className={activeSection === 'student' ? 'active' : ''} onClick={() => { setActiveSection('student'); closeMenu(); }}><i class="fa-solid fa-graduation-cap"></i> Student Dash</li>
  <li className={activeSection === 'teacher' ? 'active' : ''} onClick={() => { setActiveSection('teacher'); closeMenu(); }}><i class="fa-solid fa-chalkboard-user"></i> Teacher Dash</li>
  <li className={activeSection === 'teacheradd' ? 'active' : ''} onClick={() => { setActiveSection('teacheradd'); closeMenu(); }}><i class="fa-solid fa-plus"></i> Teacher Add</li>
</ul>

        <button className="Admin-logout-btn" onClick={handleLogout}> Logout <i class="fa-solid fa-right-from-bracket"></i></button>
      </div>

      {/* Content */}
      <div className="admin-content">
        {activeSection === 'dashboard' && <h2>📊Welcome to the Admin Dashboard!</h2>}
        {activeSection === 'student' && <StudentDash />}
        {activeSection === 'teacher' && <TeacherDash />}
        {activeSection === 'teacheradd' && <TeacherAdd />}
      </div>
    </div>
  </>
);

};

export default AdminDash;
