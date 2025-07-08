// src/components/Course.js
import React, { useState } from 'react';
import './Course.css';

const courseData = [
{
  category: "Higher Secondary (11th & 12th)",
  streams: [
    {
      name: "Science (PCM/PCB/PCMB)",
      duration: "2 Years",
      description: "Includes Physics, Chemistry, and optional Maths/Biology. Ideal for NEET, JEE, and other science-based careers.",
    },
    {
      name: "Commerce with Mathematics",
      duration: "2 Years",
      description: "Includes Accountancy, Business Studies, Economics, and Mathematics. Suitable for careers in CA, Finance, BBA, and Economics.",
    },
    {
      name: "Commerce with IT",
      duration: "2 Years",
      description: "Combines core commerce subjects with Information Technology for students inclined toward tech & business.",
    },
    {
      name: "Commerce with Secretarial Practice (SP)",
      duration: "2 Years",
      description: "Focuses on Accountancy, Business Studies, Economics along with SP for students interested in clerical, legal, or managerial fields.",
    },
    {
      name: "Arts with Psychology",
      duration: "2 Years",
      description: "Subjects include History, Political Science, Psychology and Sociology. Suitable for students interested in humanities and counseling.",
    },
    {
      name: "Arts with IT / Physical Education",
      duration: "2 Years",
      description: "Flexible combinations of History, Literature, and optional subjects like IT or Physical Education.",
    }
  ]
},
 {
  category: "Undergraduate Programs",
  streams: [
    {
      name: "B.Sc. (Computer Science)",
      duration: "3 Years",
      description: "Fundamentals of computing, data structures, algorithms, networking and programming.",
    },
    {
      name: "B.Sc. (Mathematics)",
      duration: "3 Years",
      description: "Pure and applied mathematics including statistics, linear algebra, and logical reasoning.",
    },
    {
      name: "B.Sc. (Physics/Chemistry/Biology)",
      duration: "3 Years",
      description: "In-depth study of core sciences with lab work and research orientation.",
    },
    {
      name: "BCA (Bachelor of Computer Applications)",
      duration: "3 Years",
      description: "Application-oriented computing skills in web dev, app dev, database, and cloud computing.",
    },
    {
      name: "B.Com (General)",
      duration: "3 Years",
      description: "Commerce, accounting, business law, and economics for a foundation in finance.",
    },
    {
      name: "B.Com (Banking & Finance)",
      duration: "3 Years",
      description: "Specialized in banking systems, investment markets, and corporate finance.",
    },
    {
      name: "BBA",
      duration: "3 Years",
      description: "Business Administration with focus on leadership, strategy, and entrepreneurship.",
    },
    {
      name: "BA (Psychology)",
      duration: "3 Years",
      description: "Behavioral science, counseling basics, human development and fieldwork.",
    },
    {
      name: "BA (English Literature)",
      duration: "3 Years",
      description: "Study of literary classics, modern fiction, critical theory, and creative writing.",
    },
    {
      name: "BA (History / Political Science / Sociology)",
      duration: "3 Years",
      description: "Choose your combination of social sciences for civil services and public policy paths.",
    },
  ]
},
{
  category: "Postgraduate Programs",
  streams: [
    {
      name: "M.Sc. (IT)",
      duration: "2 Years",
      description: "Advanced programming, software architecture, cloud computing, and data analytics.",
    },
    {
      name: "M.Sc. (Mathematics)",
      duration: "2 Years",
      description: "Focus on applied mathematics, linear algebra, probability theory, and modeling.",
    },
    {
      name: "M.Sc. (Physics/Chemistry/Biology)",
      duration: "2 Years",
      description: "Specialized knowledge in core sciences with research and practical lab components.",
    },
    {
      name: "M.Com",
      duration: "2 Years",
      description: "In-depth study of commerce, finance, taxation, business laws, and auditing.",
    },
    {
      name: "MBA",
      duration: "2 Years",
      description: "Master of Business Administration with specializations in HR, Finance, Marketing, and Business Analytics.",
    },
    {
      name: "MCA (Master of Computer Applications)",
      duration: "2 Years",
      description: "Advanced application development, database systems, software project management.",
    },
    {
      name: "M.A. (English)",
      duration: "2 Years",
      description: "Study of linguistics, literature, critical theory, poetry, drama and communication.",
    },
    {
      name: "M.A. (Psychology)",
      duration: "2 Years",
      description: "Cognitive psychology, counseling, clinical theory, and field-based research.",
    },
    {
      name: "M.A. (Economics)",
      duration: "2 Years",
      description: "Micro/macro economics, econometrics, statistics and economic policy.",
    }
  ]
}
];

const Course = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="course" className="section course-section">
      <h1>Our Courses</h1>
      <p className="course-intro">
        Explore a wide range of academic programs across different streams and education levels.
      </p>

      {courseData.map((group, index) => {
        const showAll = expanded[index] || false;
        const visibleCourses = showAll ? group.streams : group.streams.slice(0, 4);

        return (
          <div className="course-category" key={index}>
            <h2>{group.category}</h2>
            <div className="course-grid">
              {visibleCourses.map((course, i) => (
                <div className="course-card" key={i}>
                  <h3>{course.name}</h3>
                  <p><strong>Duration:</strong> {course.duration}</p>
                  <p>{course.description}</p>
                  <button className="enroll-btn">View Details</button>
                </div>
              ))}
            </div>
            {group.streams.length > 2 && (
              <div className="show-more-btn">
                <button onClick={() => toggleExpand(index)}>
                  {showAll ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Course;
