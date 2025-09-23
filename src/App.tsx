import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import HomePage from './components/HomePage';
import MainGrid from './components/MainGrid';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import BuildingDataPage from './components/BuildingDataPage';
import BrokerPage from './components/BrokerPage';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/building-data" element={
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <TopNav />
                <BuildingDataPage />
              </div>
            </div>
          } />
          <Route path="/broker" element={
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <TopNav />
                <BrokerPage />
              </div>
            </div>
          } />
          <Route path="/" element={
            <div className="homepage-app">
              <TopNav />
              <HomePage />
            </div>
          } />
          <Route path="/dashboard" element={
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <TopNav />
                <MainGrid />
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
