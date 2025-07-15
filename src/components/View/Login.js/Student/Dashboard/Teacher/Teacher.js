import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../../Firebase';

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'teachers'));
        const teacherList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeachers(teacherList);
        setLoading(false);
      } catch (error) {
        console.error('❌ Error fetching teacher data:', error);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="permission-container">
      <h2>📚 All Teachers</h2>
      {loading ? (
        <p className="loading-message">Loading teacher data...</p>
      ) : teachers.length === 0 ? (
        <p className="empty-message">No teacher data found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="permission-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Contact ID</th>
                <th>Course(s)</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.fullName || 'N/A'} {teacher.surname || ''}</td>
                  <td>{teacher.contactID || 'N/A'}</td>
                  <td>
                    {Array.isArray(teacher.course)
                      ? teacher.course.join(' / ')
                      : teacher.course || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Teacher;
