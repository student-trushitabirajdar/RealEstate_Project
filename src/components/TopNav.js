import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

const TopNav = () => {
  const navItems = [
    { name: 'About Us', link: '#' },
    { name: 'Contact Us', link: '#' },
    { name: 'Login', link: '#' },
    { name: 'Signup', link: '/signup' }
  ];

  return (
    <nav className="top-nav">
      <div className="nav-container">
        {navItems.map((item, index) => (
          item.link === '#' ? (
            <a
              key={index}
              href="#"
              className="nav-button"
              onClick={(e) => e.preventDefault()}
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
    </nav>
  );
};

export default TopNav;
