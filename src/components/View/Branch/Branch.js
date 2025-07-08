// src/components/Branch.js
import React, { useState, useEffect } from 'react';
import './Branch.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Branch = () => {
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const branches = [
    {
      city: "Mumbai",
      address: "Plot No. 14, Bandra-Kurla Complex, Mumbai - 400051",
      phone: "+91 98765 43210",
      email: "mumbai@stcollege.edu",
      image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      googleMapLink: "https://www.google.com/maps/search/?api=1&query=Bandra-Kurla+Complex+Mumbai"
    },
    {
      city: "Pune",
      address: "Survey No. 33, IT Park, Hinjawadi Phase 2, Pune - 411057",
      phone: "+91 87654 32109",
      email: "pune@stcollege.edu",
      image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      googleMapLink: "https://www.google.com/maps/search/?api=1&query=IT+Park+Hinjawadi+Pune"
    },
    {
      city: "Delhi",
      address: "Sector 62, Noida - NCR, Delhi - 201301",
      phone: "+91 76543 21098",
      email: "delhi@stcollege.edu",
      image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      googleMapLink: "https://www.google.com/maps/search/?api=1&query=Sector+62+Noida+Delhi"
    },
    {
      city: "Bangalore",
      address: "Whitefield Main Rd, Bangalore - 560066",
      phone: "+91 65432 10987",
      email: "bangalore@stcollege.edu",
      image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      googleMapLink: "https://www.google.com/maps/search/?api=1&query=Whitefield+Bangalore"
    },
    {
      city: "Hyderabad",
      address: "Gachibowli, Hyderabad - 500032",
      phone: "+91 54321 09876",
      email: "hyderabad@stcollege.edu",
      image: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      googleMapLink: "https://www.google.com/maps/search/?api=1&query=Gachibowli+Hyderabad"
    },
  ];

  const filteredBranches = branches.filter(branch =>
    branch.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id='branch' className="section branch-section">
      <h1>Our Branches in India</h1>
      <p className="branch-intro">
        Explore our presence across major cities, each offering high-quality education and support.
      </p>

      <input
        type="text"
        placeholder="Search by city..."
        className="branch-search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="branch-grid">
        {filteredBranches.map((branch, index) => (
          <div className="branch-card" data-aos="fade-up" key={index}>
            <img src={branch.image} alt={`${branch.city} location`} />
            <h3>{branch.city}</h3>
            <p>{branch.address}</p>
            <a
              href={branch.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              📍 View on Map
            </a>

            <button onClick={() => toggleExpand(index)} className="details-btn">
              {expanded === index ? "Hide Details" : "View Details"}
            </button>

            {expanded === index && (
              <div className="branch-details">
                <p><strong>Phone:</strong> {branch.phone}</p>
                <p><strong>Email:</strong> {branch.email}</p>
                <p><strong>Hours:</strong> Mon - Fri | 9:00 AM - 6:00 PM</p>
                <button className="contact-btn">Contact Branch</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Branch;
