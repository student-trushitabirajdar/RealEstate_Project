import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    'HOME',
    'BUILDING DATA',
    'BROKER',
    'CITY/CLIENT DATA',
    'PRESENT OWNER',
    'DAILY TO ENQUIRE',
    'WEB CONNECTIVITY',
    'BUILDER',
    'RENT AGREEMENT',
    'AUTHOR',
    'FREE POSTING',
    'NEW PROJECT',
    'QUICKSELL',
    'NEED EMPLOYEE',
    'ADVERTISING'
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>ENFOR DATA</h1>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a 
                href="#" 
                className={`nav-link ${item === 'HOME' ? 'active' : ''}`}
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="template-box">
          <div className="template-text">Template</div>
          <div className="template-subtext">Season/Festivals etc.</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
