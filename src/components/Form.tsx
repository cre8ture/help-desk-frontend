import * as React from 'react';
import { loadFromLocalStorage } from '../utils/localStorage';

import "./forms.css"

type HelpDeskFormProps = {
  fetchData: () => void; // fetchData should be a function that takes no arguments and returns void
  userEmail: string | null;  
};




const HelpDeskForm: React.FC<HelpDeskFormProps> = ({ fetchData}) => {
  // const { userEmail } = useMyContext();
const[userEmail, setUserEmail] = React.useState<string | null>(loadFromLocalStorage("helpdesk_sample"));

  
  const [formData, setFormData] = React.useState({
    name: '',
    email: userEmail,
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false); // State to track submission status


  const getEmail = async () => {  
    const userEmail2 = await loadFromLocalStorage("helpdesk_sample")
    setUserEmail(userEmail2)
}



React.useEffect(() => {
  getEmail()
}, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true
    const status:any = document.getElementById('status');
    try {
      const response = await fetch('http://helpdesk-env2.eba-ijmntygi.us-east-1.elasticbeanstalk.com/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, email: userEmail }),
      });
  
      if (response.ok) {
        fetchData();
        console.log('Ticket submitted successfully');
        setFormData({ name: '', email: userEmail, description: '' }); // Reset form data
        status.innerText = 'Ticket submitted successfully';
        status.style.color = 'green';
      } else {
        console.error('Failed to submit ticket');
      }
    } catch (error: any) {
      console.error('An error occurred:', error);
      status.innerText = 'An error occurred', error.message;
      status.style.color = 'red';
    } finally {
      setIsSubmitting(false); // Reset isSubmitting regardless of outcome
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
    paddingLeft: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '300px',
    margin: '0 auto',
   
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    marginTop: '0',
    paddingTop: '5px',
  }
  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
  };

  const inputStyle = {
    width: '80%',
    padding: '8px',
    marginBottom: '15px',
    marginLeft: '10px',
    marginRight: '10px',
    boxShadow: '0px',
    border: '1px solid #ccc',
    borderRadius: '15px',
    backgroundColor: 'white',
  };

  return (
    <div>
      <div style={formContainerStyle}>
        <p id="status" style={{color:"darkgrey", marginTop: "5px"}}></p>
        <form style={{...formStyle,alignContent: "start", alignItems: "start", flexDirection: "column"}} onSubmit={handleSubmit}>
          <p>Please submit your question</p>
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
          
            <p style={{border: "1px solid darkgrey", margin: "10px", padding: "10px", borderRadius: '15px'}}>{userEmail}</p>
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpDeskForm;
