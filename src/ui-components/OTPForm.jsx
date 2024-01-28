import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './OTPForm.css';

const OTPForm = ({ setStep, otpData }) => {
  const [enteredOTP, setEnteredOTP] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock API endpoint for OTP validation
    const apiUrl = 'http://localhost:3000/';

    try {
      // Send entered OTP to backend for validation
      const response = await axios.post(apiUrl, { email: otpData.email, enteredOTP });

      if (response.data.matched) {
        // If OTP is matched, move to the welcome page
        setStep(3);
      } else {
        // If OTP is not matched, show an alert
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
        console.error('Error validating OTP:', error);
        alert('Failed to validate OTP. Please try again.');
      }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter OTP:
          <input
            type="text"
            value={enteredOTP}
            onChange={(e) => setEnteredOTP(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit OTP</button>
      </form>
    </div>
  );
};

export default OTPForm;

