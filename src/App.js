import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/View/Home';
import Student from './components/View/Login.js/Student/Student';
import Teacher from './components/View/Login.js/Teacher';
import Register from './components/View/Login.js/Student/Register';

const App = () => {
  return (
    <Router basename="/student-teacher-booking-appointment">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
