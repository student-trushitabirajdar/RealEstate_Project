import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [showSubOptions, setShowSubOptions] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedSubOption(null);
    setShowSubOptions(true);
  };

  const handleSubOptionSelect = (subOption) => {
    setSelectedSubOption(subOption);
  };

  const handleBackToMain = () => {
    setSelectedOption(null);
    setSelectedSubOption(null);
    setShowSubOptions(false);
  };

  const getSubOptions = () => {
    if (selectedOption === 'broker') {
      return [
        {
          id: 'broker',
          title: 'Broker',
          description: 'Connect with property owners and manage real estate transactions',
          icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          features: ['Access to property listings', 'Client management tools', 'Commission tracking', 'Market analytics']
        },
        {
          id: 'author',
          title: 'Author',
          description: 'Create and publish real estate content and guides',
          icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          features: ['Content creation tools', 'Publishing platform', 'Analytics dashboard', 'Reader engagement']
        },
        {
          id: 'advertising',
          title: 'Advertising',
          description: 'Promote your services and reach potential clients',
          icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ),
          features: ['Ad campaign management', 'Target audience tools', 'Performance tracking', 'Budget optimization']
        }
      ];
    } else if (selectedOption === 'channel-partner') {
      return [
        {
          id: 'channel-partner',
          title: 'Channel Partner',
          description: 'Expand your network and grow your business through partnerships',
          icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0413 20.9999 15.5714 20.2 15.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          features: ['Partner network access', 'Lead generation tools', 'Marketing support', 'Performance rewards']
        },
        {
          id: 'advertising',
          title: 'Advertising',
          description: 'Promote your services and reach potential clients',
          icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ),
          features: ['Ad campaign management', 'Target audience tools', 'Performance tracking', 'Budget optimization']
        }
      ];
    }
    return [];
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Join Our Platform</h1>
          <p>{showSubOptions ? `Choose your ${selectedOption} type` : 'Choose your account type to get started'}</p>
        </div>
        
        {!showSubOptions ? (
          <div className="signup-options">
            <div 
              className={`option-card ${selectedOption === 'broker' ? 'selected' : ''}`}
              onClick={() => handleOptionSelect('broker')}
            >
              <div className="option-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Broker</h3>
              <p>Connect with property owners and manage real estate transactions</p>
              <ul>
                <li>Access to property listings</li>
                <li>Client management tools</li>
                <li>Commission tracking</li>
                <li>Market analytics</li>
              </ul>
            </div>

            <div 
              className={`option-card ${selectedOption === 'channel-partner' ? 'selected' : ''}`}
              onClick={() => handleOptionSelect('channel-partner')}
            >
              <div className="option-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0413 20.9999 15.5714 20.2 15.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Channel Partner</h3>
              <p>Expand your network and grow your business through partnerships</p>
              <ul>
                <li>Partner network access</li>
                <li>Lead generation tools</li>
                <li>Marketing support</li>
                <li>Performance rewards</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="signup-options">
            {getSubOptions().map((option) => (
              <div 
                key={option.id}
                className={`option-card ${selectedSubOption === option.id ? 'selected' : ''}`}
                onClick={() => handleSubOptionSelect(option.id)}
              >
                <div className="option-icon">
                  {option.icon}
                </div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <ul>
                  {option.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="signup-actions">
          {showSubOptions ? (
            <button 
              className="back-button"
              onClick={handleBackToMain}
            >
              ← Back to Main Options
            </button>
          ) : (
            <Link to="/" className="back-button">
              ← Back to Home
            </Link>
          )}
          <button 
            className={`continue-button ${(showSubOptions ? selectedSubOption : selectedOption) ? 'active' : 'disabled'}`}
            disabled={!(showSubOptions ? selectedSubOption : selectedOption)}
            onClick={() => {
              if (showSubOptions && selectedSubOption) {
                // Handle form submission based on selected sub-option
                console.log(`Selected sub-option: ${selectedSubOption}`);
                alert(`Redirecting to ${selectedSubOption} registration form...`);
              } else if (!showSubOptions && selectedOption) {
                // This will be handled by the option click handler
                return;
              }
            }}
          >
            {showSubOptions ? 'Continue' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
