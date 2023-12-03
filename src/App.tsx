import React from 'react';
import { useMyContext } from './utils/Context';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from './utils/localStorage';

const EmailSubmissionForm: React.FC = () => {
  const { userEmail, setUserEmail } = useMyContext();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveToLocalStorage('helpdesk_sample', userEmail);
    

    // Automatically navigate to the /helpdesk page
    navigate('/helpdesk'); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="email-input"
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