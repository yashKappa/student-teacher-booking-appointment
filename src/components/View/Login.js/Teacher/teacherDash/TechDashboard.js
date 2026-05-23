import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import "./TechDashboard.css";
import Profile from "./Profile";
import Requests from "./Requests";

const TechDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo">EduTech</div>
        <nav>
          <button
            className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("profile");
              setIsSidebarOpen(false); // auto close on mobile
            }}
          >
            👤 Profile
          </button>
          <button
            className={`nav-link ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("requests");
              setIsSidebarOpen(false);
            }}
          >
            📩 Requests
          </button>
          <Link to="/" className="nav-link logout">
            <LogOut size={16} /> Logout
          </Link>
        </nav>
      </aside>

      {/* Hamburger Button (only visible on mobile) */}
      <button
        className="hamburger"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "profile" && <Profile />}
        {activeTab === "requests" && <Requests />}
      </main>
    </div>
  );
};

export default TechDashboard;
