import React, { useState } from 'react';
import './BrokerPage.css';

interface FormData {
  firmName: string;
  firstName: string;
  lastName: string;
  emailId: string;
  dateOfBirth: string;
  whatsapp: string;
  alternate: string;
  foreign: string;
  address: string;
  location: string;
  city: string;
  state: string;
  postalCode: string;
  date: string;
  time: string;
  message: string;
}

const BrokerPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firmName: '',
    firstName: '',
    lastName: '',
    emailId: '',
    dateOfBirth: '',
    whatsapp: '',
    alternate: '',
    foreign: '',
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
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required fields validation
    const requiredFields: (keyof FormData)[] = [
      'firmName', 'firstName', 'lastName', 'emailId', 'dateOfBirth',
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
    const phoneFields: (keyof FormData)[] = ['whatsapp', 'alternate', 'foreign'];
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
      const res = await fetch('/api/brokers', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        alert(err.message || 'Failed to save broker data');
        return;
      }

      alert('Broker data saved successfully!');
    } catch (error) {
      alert('Network error while saving broker data');
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
    <div className="broker-container">
      <div className="broker-header">
        <h1>BROKER</h1>
      </div>
      
      <form className="broker-form" onSubmit={handleSubmit}>
        <div className="form-content">
          {/* Left Column - Personal and Contact Information */}
          <div className="form-column left-column">
            {/* Passport Photo Section */}
            <div className="photo-section">
              <div className="photo-upload-area">
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Passport photo preview" 
                    className="photo-preview"
                  />
                ) : (
                  <div className="photo-placeholder">
                    <span>PASSPORT SIZE PHOTO</span>
                  </div>
                )}
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="photo-input"
                />
                <label htmlFor="photo-upload" className="photo-upload-label">
                  Click to upload
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="firmName">Firm Name</label>
              <input
                type="text"
                id="firmName"
                name="firmName"
                value={formData.firmName}
                onChange={handleInputChange}
                className={errors.firmName ? 'error' : ''}
                placeholder="Enter firm name"
              />
              {errors.firmName && <span className="error-message">{errors.firmName}</span>}
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
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>

            <div className="form-group">
              <label>Contact No</label>
              <div className="contact-inputs">
                <div className="contact-input-group">
                  <label htmlFor="whatsapp" className="contact-label">Whatsapp</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className={errors.whatsapp ? 'error' : ''}
                    placeholder="WhatsApp number"
                  />
                  {errors.whatsapp && <span className="error-message">{errors.whatsapp}</span>}
                </div>
                <div className="contact-input-group">
                  <label htmlFor="alternate" className="contact-label">Alternate</label>
                  <input
                    type="tel"
                    id="alternate"
                    name="alternate"
                    value={formData.alternate}
                    onChange={handleInputChange}
                    className={errors.alternate ? 'error' : ''}
                    placeholder="Alternate number"
                  />
                  {errors.alternate && <span className="error-message">{errors.alternate}</span>}
                </div>
                <div className="contact-input-group">
                  <label htmlFor="foreign" className="contact-label">Foreign</label>
                  <input
                    type="tel"
                    id="foreign"
                    name="foreign"
                    value={formData.foreign}
                    onChange={handleInputChange}
                    className={errors.foreign ? 'error' : ''}
                    placeholder="Foreign number"
                  />
                  {errors.foreign && <span className="error-message">{errors.foreign}</span>}
                </div>
              </div>
            </div>

            {/* Excel Buttons */}
            <div className="excel-buttons">
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
          </div>

          {/* Right Column - Address and Additional Information */}
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

            {/* Message Box */}
            <div className="form-group">
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

            {/* Date and Time */}
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
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save Broker Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrokerPage;
