import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.css';

type OptionType = 'broker' | 'channel-partner' | null;

interface FormData {
  fullName: string;
  email: string;
  contactNumber: string;
  location: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    contactNumber: '',
    location: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleOptionSelect = (option: OptionType): void => {
    setSelectedOption(option);
    setShowForm(true);
  };

  const handleBackToMain = (): void => {
    setSelectedOption(null);
    setShowForm(false);
    setFormData({
      fullName: '',
      email: '',
      contactNumber: '',
      location: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit contact number';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', { option: selectedOption, ...formData });
      alert(`Registration successful for ${selectedOption === 'broker' ? 'Broker' : 'Channel Partner'}!`);
      // Here you would typically send the data to your backend
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Join Our Platform</h1>
          <p>
            {showForm 
              ? `Create your ${selectedOption === 'broker' ? 'Broker' : 'Channel Partner'} account` 
              : 'Choose your account type to get started'
            }
          </p>
        </div>
        
        {!showForm ? (
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
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={errors.contactNumber ? 'error' : ''}
                placeholder="Enter your 10-digit contact number"
              />
              {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={errors.location ? 'error' : ''}
                placeholder="Enter your location"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </form>
        )}

        <div className="signup-actions">
          {showForm ? (
            <button 
              className="back-button"
              onClick={handleBackToMain}
              type="button"
            >
              ← Back to Options
            </button>
          ) : (
            <Link to="/" className="back-button">
              ← Back to Home
            </Link>
          )}
          
          {showForm ? (
            <button 
              className="continue-button active"
              onClick={handleSubmit}
              type="submit"
            >
              Create Account
            </button>
          ) : (
            <button 
              className={`continue-button ${selectedOption ? 'active' : 'disabled'}`}
              disabled={!selectedOption}
              onClick={() => selectedOption && handleOptionSelect(selectedOption)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
