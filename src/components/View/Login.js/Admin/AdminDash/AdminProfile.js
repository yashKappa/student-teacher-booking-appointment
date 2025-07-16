import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../../../../Firebase';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import './AdminProfile.css';

const AdminProfile = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [requests, setRequests] = useState([]);

  const [studentWeeklyChunks, setStudentWeeklyChunks] = useState([]);
  const [teacherWeeklyChunks, setTeacherWeeklyChunks] = useState([]);
  const [weeklyRequestChunks, setWeeklyRequestChunks] = useState([]);

  const [currentStudentWeekIndex, setCurrentStudentWeekIndex] = useState(0);
  const [currentTeacherWeekIndex, setCurrentTeacherWeekIndex] = useState(0);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const COLORS = ['#82ca9d', '#8884d8'];



useEffect(() => {
  const getDayKey = (timestamp) => {
    const date = timestamp?.toDate?.() || new Date();
    return date.toISOString().split('T')[0];
  };

  const groupByDay = (items, key) => {
    const map = {};
    items.forEach(item => {
      const dateKey = getDayKey(item[key]);
      map[dateKey] = (map[dateKey] || 0) + 1;
    });
    return map;
  };

  const generateChartData = (map, label, sortedDates) => {
    return sortedDates.map(date => ({
      date,
      [label]: map[date] || 0
    }));
  };

  const chunkArray = (arr, size = 7) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const allDates = new Set([
    ...students.map(s => getDayKey(s.createdAt)),
    ...teachers.map(t => getDayKey(t.createdAt)),
    ...requests.map(r => getDayKey(r.submittedAt))
  ]);
  const sortedDates = Array.from(allDates).sort();

  const studentMap = groupByDay(students, 'createdAt');
  const teacherMap = groupByDay(teachers, 'createdAt');
  const requestMap = groupByDay(requests, 'submittedAt');

  setStudentWeeklyChunks(chunkArray(generateChartData(studentMap, 'students', sortedDates)));
  setTeacherWeeklyChunks(chunkArray(generateChartData(teacherMap, 'teachers', sortedDates)));
  setWeeklyRequestChunks(chunkArray(generateChartData(requestMap, 'count', sortedDates)));
}, [students, teachers, requests]);


  // Real-time Firebase listeners
  useEffect(() => {
    const unsubStudents = onSnapshot(collection(db, 'students'), snapshot => {
      setStudents(snapshot.docs.map(doc => doc.data()));
    });

    const unsubTeachers = onSnapshot(collection(db, 'teachers'), snapshot => {
      setTeachers(snapshot.docs.map(doc => doc.data()));
    });

    const unsubRequests = onSnapshot(
      query(collection(db, 'requests'), orderBy('submittedAt')),
      snapshot => {
        setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    return () => {
      unsubStudents();
      unsubTeachers();
      unsubRequests();
    };
  }, []);

  const pieData = [
    { name: 'Students', value: students.length },
    { name: 'Teachers', value: teachers.length },
  ];

  const renderTable = (filterStatus, title) => (
    <>
      <h3>{title}</h3>
      <table className="recent-requests">
        <thead>
          <th>Name</th><th>Course</th><th>Subject</th><th>Date</th>
        </thead>
        <tbody>
          {requests
            .filter(req => (filterStatus === 'pending' ? !req.status || req.status === 'pending' : req.status === filterStatus))
            .sort((a, b) => b.submittedAt?.toDate() - a.submittedAt?.toDate())
            .slice(0, 5)
            .map((req, i) => (
              <tr key={req.id || i}>
                <td>{req.name || 'N/A'}</td>
                <td>{req.course || 'N/A'}</td>
                <td>{req.subject || 'N/A'}</td>
                <td>{req.submittedAt?.toDate().toLocaleString() || 'N/A'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Dashboard Overview</h2>

      <div className="stat-cards">
        <div className="card">👨‍🎓 Total Students: <strong>{students.length}</strong></div>
        <div className="card">👩‍🏫 Total Teachers: <strong>{teachers.length}</strong></div>
      </div>

      {/* Students Chart */}
      <h3>📘 Weekly Student Joins</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={studentWeeklyChunks[currentStudentWeekIndex] || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="students" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <div className="weekly">
        <button
          onClick={() => setCurrentStudentWeekIndex(i => Math.max(i - 1, 0))}
          disabled={currentStudentWeekIndex === 0}
        ><i class="fa-solid fa-arrow-left"></i> Previous</button>
        <button
          onClick={() => setCurrentStudentWeekIndex(i => Math.min(i + 1, studentWeeklyChunks.length - 1))}
          disabled={currentStudentWeekIndex === studentWeeklyChunks.length - 1}
        >Next <i class="fa-solid fa-arrow-right"></i></button>
      </div>

      {/* Teachers Chart */}
      <h3>📗 Weekly Teacher Joins</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={teacherWeeklyChunks[currentTeacherWeekIndex] || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="teachers" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div className="weekly">
        <button
          onClick={() => setCurrentTeacherWeekIndex(i => Math.max(i - 1, 0))}
          disabled={currentTeacherWeekIndex === 0}
        ><i class="fa-solid fa-arrow-left"></i> Previous</button>
        <button
          onClick={() => setCurrentTeacherWeekIndex(i => Math.min(i + 1, teacherWeeklyChunks.length - 1))}
          disabled={currentTeacherWeekIndex === teacherWeeklyChunks.length - 1}
        >Next <i class="fa-solid fa-arrow-right"></i></button>
      </div>

      {/* Requests Chart */}
      <h3>📅 Weekly Request Counts</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyRequestChunks[currentWeekIndex] || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
      <div className="weekly">
        <button
          onClick={() => setCurrentWeekIndex(i => Math.max(i - 1, 0))}
          disabled={currentWeekIndex === 0}
        ><i class="fa-solid fa-arrow-left"></i> Previous</button>
        <button
          onClick={() => setCurrentWeekIndex(i => Math.min(i + 1, weeklyRequestChunks.length - 1))}
          disabled={currentWeekIndex === weeklyRequestChunks.length - 1}
        >Next <i class="fa-solid fa-arrow-right"></i></button>
      </div>

      {/* Pie Chart */}
      <h3>🎯 Students vs Teachers Ratio</h3>
      <div className="chart-section" style={{ display: 'flex', justifyContent: 'center' }}>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" />
              ))}
            </Pie>
            <text x="50%" y="50%" className="pie-center-label">
              {students.length + teachers.length} Total
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {renderTable('pending', '🕒 Pending Requests')}
      {renderTable('accepted', '✅ Accepted Requests')}
      {renderTable('rejected', '❌ Rejected Requests')}
    </div>
  );
};

export default AdminProfile;
