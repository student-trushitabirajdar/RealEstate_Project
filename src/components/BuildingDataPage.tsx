import React, { useState } from 'react';
import './BuildingDataPage.css';

interface FormData {
  societyName: string;
  flatNo: string;
  firstName: string;
  lastName: string;
  emailId: string;
  whatsapp: string;
  alternate: string;
  international: string;
  address: string;
  location: string;
  city: string;
  state: string;
  postalCode: string;
  date: string;
  time: string;
  message: string;
}

const BuildingDataPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    societyName: '',
    flatNo: '',
    firstName: '',
    lastName: '',
    emailId: '',
    whatsapp: '',
    alternate: '',
    international: '',
    address: '',
    location: '',
    city: '',
    state: '',
    postalCode: '',
    date: '',
    time: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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

    // Required fields validation
    const requiredFields: (keyof FormData)[] = [
      'societyName', 'flatNo', 'firstName', 'lastName', 'emailId', 
      'address', 'location', 'city', 'state', 'postalCode'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.emailId && !/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email address';
    }

    // Phone number validation (basic)
    const phoneFields: (keyof FormData)[] = ['whatsapp', 'alternate', 'international'];
    phoneFields.forEach(field => {
      if (formData[field] && !/^[\d\s\-\+\(\)]+$/.test(formData[field])) {
        newErrors[field] = 'Please enter a valid phone number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch('/api/buildings', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        alert(err.message || 'Failed to save building data');
        return;
      }

      alert('Building data saved successfully!');
    } catch (error) {
      alert('Network error while saving building data');
    }
  };

  const handleImportExcel = (): void => {
    // TODO: Implement Excel import functionality
    alert('Excel import functionality will be implemented');
  };

  const handleExportExcel = (): void => {
    // TODO: Implement Excel export functionality
    alert('Excel export functionality will be implemented');
  };

  return (
    <div className="building-data-container">
      <div className="building-data-header">
        <h1>BUILDING DATA</h1>
      </div>
      
      <form className="building-data-form" onSubmit={handleSubmit}>
        <div className="form-content">
          {/* Left Column - Personal/Society Information */}
          <div className="form-column left-column">
            <div className="form-group">
              <label htmlFor="societyName">Society Name/Apartment</label>
              <input
                type="text"
                id="societyName"
                name="societyName"
                value={formData.societyName}
                onChange={handleInputChange}
                className={errors.societyName ? 'error' : ''}
                placeholder="Enter society or apartment name"
              />
              {errors.societyName && <span className="error-message">{errors.societyName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="flatNo">Flat No</label>
              <input
                type="text"
                id="flatNo"
                name="flatNo"
                value={formData.flatNo}
                onChange={handleInputChange}
                className={errors.flatNo ? 'error' : ''}
                placeholder="Enter flat number"
              />
              {errors.flatNo && <span className="error-message">{errors.flatNo}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter first name"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter last name"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="emailId">Email ID</label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleInputChange}
                className={errors.emailId ? 'error' : ''}
                placeholder="Enter email address"
              />
              {errors.emailId && <span className="error-message">{errors.emailId}</span>}
            </div>

            <div className="form-group">
              <label>Contact No</label>
              <div className="contact-buttons">
                <button
                  type="button"
                  className="contact-btn whatsapp"
                  onClick={() => document.getElementById('whatsapp')?.focus()}
                >
                  Whatsapp
                </button>
                <button
                  type="button"
                  className="contact-btn alternate"
                  onClick={() => document.getElementById('alternate')?.focus()}
                >
                  Alternate
                </button>
                <button
                  type="button"
                  className="contact-btn international"
                  onClick={() => document.getElementById('international')?.focus()}
                >
                  International
                </button>
              </div>
              <div className="contact-inputs">
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className={errors.whatsapp ? 'error' : ''}
                  placeholder="WhatsApp number"
                />
                <input
                  type="tel"
                  id="alternate"
                  name="alternate"
                  value={formData.alternate}
                  onChange={handleInputChange}
                  className={errors.alternate ? 'error' : ''}
                  placeholder="Alternate number"
                />
                <input
                  type="tel"
                  id="international"
                  name="international"
                  value={formData.international}
                  onChange={handleInputChange}
                  className={errors.international ? 'error' : ''}
                  placeholder="International number"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Address Information */}
          <div className="form-column right-column">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
                placeholder="Enter address"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={errors.location ? 'error' : ''}
                placeholder="Enter location"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={errors.city ? 'error' : ''}
                placeholder="Enter city"
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={errors.state ? 'error' : ''}
                placeholder="Enter state"
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className={errors.postalCode ? 'error' : ''}
                placeholder="Enter postal code"
              />
              {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="form-bottom">
          {/* Left - File Operations */}
          <div className="file-operations">
            <button
              type="button"
              className="excel-btn import"
              onClick={handleImportExcel}
            >
              Import Excel File
            </button>
            <button
              type="button"
              className="excel-btn export"
              onClick={handleExportExcel}
            >
              Export Excel file
            </button>
          </div>

          {/* Middle - Date and Time */}
          <div className="datetime-section">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="datetime-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="datetime-input"
              />
            </div>
          </div>

          {/* Right - Message Box */}
          <div className="message-section">
            <label htmlFor="message">Message Box</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="message-box"
              placeholder="Enter your message here..."
              rows={6}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save Building Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuildingDataPage;
