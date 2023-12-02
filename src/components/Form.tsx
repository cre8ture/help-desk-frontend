import * as React from 'react';
import { useMyContext } from '../utils/Context';

type HelpDeskFormProps = {
  fetchData: () => void; // fetchData should be a function that takes no arguments and returns void
  
};




const HelpDeskForm: React.FC<HelpDeskFormProps> = ({ fetchData}) => {
  const { userEmail } = useMyContext();
  const [formData, setFormData] = React.useState({
    name: '',
    email: userEmail,
    description: '',
  });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Create a new Date object for the current date and time
    const currentDateTime = new Date();
  
    // Format the date and time separately
    const currentDate = currentDateTime.toISOString().split('T')[0]; // YYYY-MM-DD format
    const currentTime = currentDateTime.toTimeString().split(' ')[0]; // HH:MM:SS format
  
    // Extend formData with the separate date and time
    const extendedFormData = {
      ...formData,
      // date: currentDate,
      // time: currentTime,
    };
    
    try {
      const response = await fetch('http://helpdesk-env2.eba-ijmntygi.us-east-1.elasticbeanstalk.com/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(extendedFormData),
      });
  
      if (response.ok) {
        // Handle successful response
        fetchData();
        console.log('Ticket submitted successfully');
      } else {
        // Handle error response
        console.error('Failed to submit ticket');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formContainerStyle = {
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '300px',
    margin: '0 auto',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  return (
    <div>
      <button>Open Help Desk Form</button>
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>
            Name
            <input
              type="text"
              name="name"
              required
              style={inputStyle}
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label style={labelStyle}>
            Email
            <input
              type="email"
              name="email"
              required
              style={inputStyle}
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label style={labelStyle}>
            Problem Description
            <textarea
              name="description"
              required
              style={{ ...inputStyle, height: '100px' }}
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px' }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpDeskForm;
