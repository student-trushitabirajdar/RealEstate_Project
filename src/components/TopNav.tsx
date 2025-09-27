import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './TopNav.css';

interface NavItem {
  name: string;
  link: string;
}

const TopNav: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  const navItems: NavItem[] = [
    { name: 'About Us', link: '#' },
    { name: 'Contact Us', link: '#' },
    ...(isAuthenticated 
      ? [] 
      : [
          { name: 'Login', link: '/login' },
          { name: 'Signup', link: '/signup' }
        ]
    )
  ];

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <h1 className="brand-name">Enfor Data</h1>
        </div>
        
        <div className="nav-links">
          {navItems.map((item, index) => (
            item.link === '#' ? (
              <a
                key={index}
                href="#"
                className="nav-button"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={index}
                to={item.link}
                className="nav-button"
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
        
        {isAuthenticated && user && (
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <button 
              className="logout-button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
