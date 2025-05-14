// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

import MentalHealth from "./components/MentalHealth";
import EducationEmployment from "./components/EducationEmployment";
import Environment from "./components/Environment";
import InternetBandwidth from "./components/InternetBandwidth";
import MapComponent from "./components/MapComponent";

import { FaHeartbeat, FaGlobeAmericas, FaLeaf, FaWifi } from 'react-icons/fa'; 

function HomePage() {
  return (
    <div className="main-layout">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <h1 className="sidebar-title">COVID-19 Indirect Effects</h1>
        <nav className="nav-links">
          <Link to="/mental-health" className="side-link">
            <FaHeartbeat /> Mental Health & Social Behavior
          </Link>
          <Link to="/education-employment" className="side-link">
            <FaGlobeAmericas /> Education & Employment
          </Link>
          <Link to="/environment" className="side-link">
            <FaLeaf /> Environmental Impact
          </Link>
          <Link to="/internet-bandwidth" className="side-link">
            <FaWifi /> Internet Bandwidth & Digital Divide
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="map-area">
        <h2 className="map-title">COVID-19 Global Map (2020–2021)</h2>
        <MapComponent />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/education-employment" element={<EducationEmployment />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/internet-bandwidth" element={<InternetBandwidth />} />
      </Routes>
    </Router>
  );
}

export default App;
