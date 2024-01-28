import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './EmailForm.css';

const EmailForm = ({ setStep, setOtpData }) => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const apiUrl = 'http://localhost:3000/';

    try {
      // Send email to backend for OTP generation
      const response = await axios.post(apiUrl, { email });

      // API response should contain the OTP
      const { otp } = response.data;

      // Set OTP data and move to the next step
      setOtpData({ email, otp });
      setStep(2);
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default EmailForm;
