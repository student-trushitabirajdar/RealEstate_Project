import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'BUILDING DATA', path: '/building-data' },
    { name: 'BROKER', path: '/broker' },
    { name: 'CITY/CLIENT DATA', path: '/city-client-data' },
    { name: 'PRESENT OWNER', path: '/present-owner' },
    { name: 'DAILY TO ENQUIRE', path: '/daily-enquire' },
    { name: 'WEB CONNECTIVITY', path: '/web-connectivity' },
    { name: 'BUILDER', path: '/builder' },
    { name: 'RENT AGREEMENT', path: '/rent-agreement' },
    { name: 'AUTHOR', path: '/author' },
    { name: 'FREE POSTING', path: '/free-posting' },
    { name: 'NEW PROJECT', path: '/new-project' },
    { name: 'QUICKSELL', path: '/quicksell' },
    { name: 'NEED EMPLOYEE', path: '/need-employee' },
    { name: 'ADVERTISING', path: '/advertising' }
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
              <Link 
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
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
