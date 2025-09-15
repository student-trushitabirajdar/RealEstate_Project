import React from 'react';
import './MainGrid.css';

const MainGrid = () => {
  const gridItems = [
    {
      id: 1,
      title: 'BUILDING DATA',
      icon: '🏢',
      description: 'Building information and data'
    },
    {
      id: 2,
      title: 'BROKER',
      icon: '👔',
      description: 'Broker services and information'
    },
    {
      id: 3,
      title: 'CITY/CLIENT DATA',
      icon: '🏙️',
      description: 'City and client data management'
    },
    {
      id: 4,
      title: 'PRESENT OWNER',
      icon: '📦',
      description: 'Current property ownership details'
    },
    {
      id: 5,
      title: 'DAILY TO ENQUIRE',
      icon: '📞',
      description: 'Daily inquiry management'
    },
    {
      id: 6,
      title: 'WEB CONNECTIVITY',
      icon: '🌐',
      description: 'Web connectivity services'
    },
    {
      id: 7,
      title: 'BUILDER',
      icon: '💻',
      description: 'Builder information and services'
    },
    {
      id: 8,
      title: 'RENT AGREEMENT',
      icon: '🤝',
      description: 'Rental agreement management'
    },
    {
      id: 9,
      title: 'AUTHOR',
      icon: '👥',
      description: 'Author and user management'
    },
    {
      id: 10,
      title: 'FREE POSTING',
      icon: '🏠',
      description: 'Free property posting services'
    },
    {
      id: 11,
      title: 'NEW PROJECT',
      icon: '📋',
      description: 'New project management'
    },
    {
      id: 12,
      title: 'QUICK SELL',
      icon: '🏷️',
      description: 'Quick selling services'
    },
    {
      id: 13,
      title: 'NEED EMPLOYEE',
      icon: '📢',
      description: 'Employee recruitment services'
    },
    {
      id: 14,
      title: 'ADVERTISING',
      icon: '📺',
      description: 'Advertising and marketing services'
    }
  ];

  const handleCardClick = (item) => {
    console.log(`Clicked on ${item.title}`);
    // Add navigation logic here
  };

  return (
    <div className="main-grid-container">
      <div className="main-grid">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className="grid-card"
            onClick={() => handleCardClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(item);
              }
            }}
            aria-label={`${item.title} - ${item.description}`}
          >
            <div className="card-icon">
              {item.icon}
            </div>
            <div className="card-title">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainGrid;
