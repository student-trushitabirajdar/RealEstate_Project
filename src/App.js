import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import MainGrid from './components/MainGrid';
import SignupPage from './components/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={
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
  );
}

export default App;
