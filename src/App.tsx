import React, { useState } from 'react';
import { useMyContext } from './utils/Context';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from './utils/localStorage';

const EmailSubmissionForm: React.FC = () => {
  const { userEmail, setUserEmail } = useMyContext();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveToLocalStorage('helpdesk_sample', userEmail);
    
    // Save the user's email to the context
    // setUserEmail('user@example.com'); // Replace with the actual user input

    // Automatically navigate to the /helpdesk page
    navigate('/helpdesk'); // Use navigate() instead of history.push()
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailSubmissionForm;