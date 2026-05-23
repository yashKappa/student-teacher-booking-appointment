import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../Firebase";
import { User, Mail, Phone, BookOpen, Award, IdCard } from "lucide-react";

const Profile = () => {
  const [teacherData, setTeacherData] = useState(null);

  const getTeacherIdFromCookies = () => {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const cookie = cookies.find((c) => c.startsWith("teacherID="));
    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
    const fetchTeacherData = async () => {
      const teacherID = getTeacherIdFromCookies();
      if (!teacherID) return;

      try {
        const q = query(
          collection(db, "teachers"),
          where("teacherID", "==", teacherID)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setTeacherData(data);
        }
      } catch (err) {
        console.error("Error fetching teacher data:", err);
      }
    };

    fetchTeacherData();
  }, []);

  return (
    <section className="profile-card">
      <div className="profile-header">
        <img
          src="https://www.pngmart.com/files/23/User-PNG-HD.png"
          alt="Profile"
          className="profile-img"
        />
        <div>
          <h2>{teacherData?.fullName} {teacherData?.surname}</h2>
          <p className="specialist">{teacherData?.specialist}</p>
        </div>
      </div>

      {teacherData && (
        <div className="profile-info">
          <div><User size={18} /> {teacherData.fullName} {teacherData.surname}</div>
          <div><Mail size={18} /> {teacherData.email}</div>
          <div><Phone size={18} /> {teacherData.phone}</div>
          <div><IdCard size={18} /> Teacher ID: {teacherData.teacherID}</div>
          <div><Award size={18} /> Contact ID: {teacherData.contactID}</div>
          <div>
            <BookOpen size={18} /> Courses:{" "}
            {Array.isArray(teacherData.course)
              ? teacherData.course.map((c, i) => (
                  <span key={i} className="badge">{c}</span>
                ))
              : <span className="badge">{teacherData.course}</span>}
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;

