import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

interface GridItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const gridItems: GridItem[] = [
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

  const handleCardClick = (item: GridItem): void => {
    console.log(`Clicked on ${item.title}`);
    
    // Navigate to specific pages based on the item
    switch (item.title) {
      case 'BUILDING DATA':
        navigate('/building-data');
        break;
      case 'BROKER':
        navigate('/broker');
        break;
      case 'CITY/CLIENT DATA':
        navigate('/city-client-data');
        break;
      case 'PRESENT OWNER':
        navigate('/present-owner');
        break;
      case 'DAILY TO ENQUIRE':
        navigate('/daily-enquire');
        break;
      case 'WEB CONNECTIVITY':
        navigate('/web-connectivity');
        break;
      case 'BUILDER':
        navigate('/builder');
        break;
      case 'RENT AGREEMENT':
        navigate('/rent-agreement');
        break;
      case 'AUTHOR':
        navigate('/author');
        break;
      case 'FREE POSTING':
        navigate('/free-posting');
        break;
      case 'NEW PROJECT':
        navigate('/new-project');
        break;
      case 'QUICK SELL':
        navigate('/quicksell');
        break;
      case 'NEED EMPLOYEE':
        navigate('/need-employee');
        break;
      case 'ADVERTISING':
        navigate('/advertising');
        break;
      default:
        console.log(`No route defined for ${item.title}`);
    }
  };

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            We bring properties and people together.
          </h1>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="main-grid-container">
        <div className="main-grid">
          {gridItems.map((item) => (
            <div
              key={item.id}
              className="grid-card"
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
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
    </div>
  );
};

export default HomePage;

