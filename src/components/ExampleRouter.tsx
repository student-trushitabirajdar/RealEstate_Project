import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import MainGrid from './MainGrid';

// Example page components
const HomePage: React.FC = () => (
  <div className="page-content">
    <h1>Welcome to ENFOR DATA</h1>
    <p>This is the home page content.</p>
  </div>
);

const BuildingDataPage: React.FC = () => (
  <div className="page-content">
    <h1>Building Data</h1>
    <p>Building data management and information.</p>
  </div>
);

const BrokerPage: React.FC = () => (
  <div className="page-content">
    <h1>Broker Services</h1>
    <p>Broker information and services.</p>
  </div>
);

const ExampleRouter: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <TopNav />
          <Routes>
            <Route path="/" element={<MainGrid />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/building-data" element={<BuildingDataPage />} />
            <Route path="/broker" element={<BrokerPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default ExampleRouter;
