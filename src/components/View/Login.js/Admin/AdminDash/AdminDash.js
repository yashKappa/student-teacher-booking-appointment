import React, { useState } from 'react';
import './AdminDash.css';
import StudentDash from './StudentDash/StudentDash';
import TeacherDash from './TeacherDash/TeacherDash';
import TeacherAdd from './TeacherDash/TeacherAdd';

const AdminDash = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
       <div className='header'>
         <h1>S&T</h1>
        <h3>🛠 Admin Panel</h3>
       </div>
        <ul>
          <li
            className={activeSection === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={activeSection === 'student' ? 'active' : ''}
            onClick={() => setActiveSection('student')}
          >
            Student Dash
          </li>
          <li
            className={activeSection === 'teacher' ? 'active' : ''}
            onClick={() => setActiveSection('teacher')}
          >
            Teacher Dash
          </li>
          <li
            className={activeSection === 'teacheradd' ? 'active' : ''}
            onClick={() => setActiveSection('teacheradd')}
          >
            Teacher Add
          </li>
        </ul>
      </div>

      <div className="admin-content">
        {activeSection === 'dashboard' && <h2>Welcome to the Admin Dashboard!</h2>}
        {activeSection === 'student' && <StudentDash />}
        {activeSection === 'teacher' && <TeacherDash />}
        {activeSection === 'teacheradd' && <TeacherAdd />}
      </div>
    </div>
  );
};

export default AdminDash;
