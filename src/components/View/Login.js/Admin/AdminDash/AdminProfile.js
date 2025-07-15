import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../../Firebase';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import './AdminProfile.css'; // optional for styling
import { PieChart, Pie, Cell } from 'recharts';
import {
  AreaChart, Area,
} from 'recharts';


const AdminProfile = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    studentMonthly: [],
    teacherMonthly: [],
    requestCounts: [],
      fullRequests: [], 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsSnap, teachersSnap, requestsSnap] = await Promise.all([
          getDocs(collection(db, 'students')),
          getDocs(collection(db, 'teachers')),
          getDocs(query(collection(db, 'requests'), orderBy('submittedAt')))
        ]);

        const students = studentsSnap.docs.map(doc => doc.data());
        const teachers = teachersSnap.docs.map(doc => doc.data());
        const requests = requestsSnap.docs.map(doc => ({id: doc.id,...doc.data(),}));

        const getMonthKey = (timestamp) => {
          const date = timestamp?.toDate?.() || new Date();
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        };

        const getDayKey = (timestamp) => {
          const date = timestamp?.toDate?.() || new Date();
          return date.toISOString().split('T')[0];
        };

        // Monthly join counts
        const studentMonthlyMap = {};
        const teacherMonthlyMap = {};
        const requestDailyMap = {};

        students.forEach(s => {
          const key = getMonthKey(s.createdAt);
          studentMonthlyMap[key] = (studentMonthlyMap[key] || 0) + 1;
        });

        teachers.forEach(t => {
          const key = getMonthKey(t.createdAt);
          teacherMonthlyMap[key] = (teacherMonthlyMap[key] || 0) + 1;
        });

        requests.forEach(r => {
          const dateKey = getDayKey(r.submittedAt);
          requestDailyMap[dateKey] = (requestDailyMap[dateKey] || 0) + 1;
        });

        const studentMonthly = Object.entries(studentMonthlyMap).map(([month, count]) => ({ month, students: count }));
        const teacherMonthly = Object.entries(teacherMonthlyMap).map(([month, count]) => ({ month, teachers: count }));
        const requestCounts = Object.entries(requestDailyMap).map(([date, count]) => ({ date, count }));

        setStats({
          totalStudents: students.length,
          totalTeachers: teachers.length,
          studentMonthly,
          teacherMonthly,
          requestCounts,
          fullRequests: requests,
        });
      } catch (error) {
        console.error('❌ Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const calcGrowth = (data) => {
  if (data.length < 2) return '0%';
  const [prev, latest] = data.slice(-2).map(d => d.students || d.teachers);
  const growth = ((latest - prev) / (prev || 1)) * 100;
  return `${growth.toFixed(1)}%`;
};
const pieData = [
  { name: 'Students', value: stats.totalStudents },
  { name: 'Teachers', value: stats.totalTeachers },
];

const COLORS = ['#82ca9d', '#8884d8'];


  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Dashboard Overview</h2>

      <div className="stat-cards">
        <div className="card">👨‍🎓 Total Students: <strong>{stats.totalStudents}</strong></div>
        <div className="card">👩‍🏫 Total Teachers: <strong>{stats.totalTeachers}</strong></div>
      </div>

      <h3>📅 Monthly Student and Teacher Joins</h3>
      <ResponsiveContainer width="100%" height={300}>
  <AreaChart data={mergeMonthly(stats.studentMonthly, stats.teacherMonthly)}>
    <defs>
      <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorTeachers" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Area type="monotone" dataKey="students" stroke="#82ca9d" fillOpacity={1} fill="url(#colorStudents)" />
    <Area type="monotone" dataKey="teachers" stroke="#8884d8" fillOpacity={1} fill="url(#colorTeachers)" />
  </AreaChart>
</ResponsiveContainer>



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
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            stroke="#fff"
          />
        ))}
      </Pie>
      <text x="50%" y="50%" className="pie-center-label">
        {stats.totalStudents + stats.totalTeachers} Total
      </text>
    </PieChart>
  </ResponsiveContainer>
</div>


     <h3>🕒 Recent Requests</h3>
<table className="recent-requests">
  <thead>
      <th>Name</th>
      <th>Course</th>
      <th>Subject</th>
      <th>Date</th>
  </thead>
  <tbody>
    {[...stats.fullRequests]
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


<div className="stat-cards">
  <div className="card">
    📈 Student Growth:
    <div style={{ color: '#4caf50', fontWeight: 'bold' }}>
      {calcGrowth(stats.studentMonthly)}
    </div>
  </div>
  <div className="card">
    👩‍🏫 Teacher Growth:
    <div style={{ color: '#3f51b5', fontWeight: 'bold' }}>
      {calcGrowth(stats.teacherMonthly)}
    </div>
  </div>
</div>


    </div>
  );
};

// Combine student and teacher joins by month
const mergeMonthly = (students, teachers) => {
  const map = {};

  students.forEach(({ month, students }) => {
    map[month] = { month, students, teachers: 0 };
  });

  teachers.forEach(({ month, teachers }) => {
    if (map[month]) {
      map[month].teachers = teachers;
    } else {
      map[month] = { month, students: 0, teachers };
    }
  });

  return Object.values(map).sort((a, b) => new Date(a.month) - new Date(b.month));
};

export default AdminProfile;
