import React, { useState, useEffect, useRef } from 'react';
import {formatDateTime} from '../utils/date';
import { v4 as uuidv4 } from 'uuid';


interface Response {
  staffName: string;
  response: string;
  dateResponded: string;
}

interface Ticket {
  id: number;
  name: string;
  email: string;
  description: string;
  status: string;
  dateSubmitted: string;
  response_name: string; // TEXT,  // Stores the name of the responder
  response_response: string; // TEXT,  // Stores the response text
  dateResponded: string; // DATE  // Stores the date and time when a response is made
}


interface TicketListProps {
  // data: Data;
}

const url:string = 'http://localhost:3000/tickets'

const TicketList: React.FC<TicketListProps> = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('date');
  const [_, setResponseText] = useState(''); // To store the response text


  // Sorting function
  const sortTickets = (tickets:any, criteria:any) => {
    return [...tickets].sort((a, b) => {
      if (criteria === 'date') {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);
  
        // Check if both dates are valid
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateA.getTime() - dateB.getTime();
        } else {
          return 0; // or some other logic to handle invalid dates
        }
      } else if (criteria === 'status') {
        return a.status.localeCompare(b.status);
      } else if (criteria === 'email') {
        return a.email.localeCompare(b.email);
      }
    });
  };
  
  // Create a ref for the textarea element
  const responseTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResponseButtonClick = (ticketId: number) => {
    // Toggle the showResponseForm state for the clicked ticket
    setTickets((prevTickets: any) =>
      prevTickets.map((ticket: any) =>
        ticket.id === ticketId ? { ...ticket, showResponseForm: !ticket.showResponseForm } : ticket
      )
    );

    // When showing the response form, focus on the textarea element
    if (responseTextareaRef.current) {
      responseTextareaRef.current.focus();
    }
  };

  const handleResponseSubmit = async (id: string, fieldToChange: string, newValue: any) => {
    try {
      // Make a PUT request to update the ticket
      const response = await fetch(`http://helpdesk-env2.eba-ijmntygi.us-east-1.elasticbeanstalk.com/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ["response_name"]: "Staff",
          [fieldToChange]: newValue
        }),
      });

      if (response.ok) {
        // Handle successful response, e.g., show a success message
        console.log('Ticket updated successfully. Email successfully sent!');

        // Call fetchData to refresh the data
        fetchData();
      } else {
        // Handle error response, e.g., show an error message
        console.error('Failed to update ticket');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    // After handling the submit, reset the response text
    setResponseText('');
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://helpdesk-env2.eba-ijmntygi.us-east-1.elasticbeanstalk.com/tickets');
      const data = await response.json();

      console.log("data", data);
      // Add the showResponseForm property to each ticket
      const ticketsWithResponseForm = data.map((ticket: any) => ({ ...ticket, showResponseForm: false }));
      // Use a functional update to ensure the state is updated correctly
      setTickets(ticketsWithResponseForm);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ticket-list">
      <h1 className="title">Tickets</h1>
      {isLoading && <p>Loading...</p>}
      <label htmlFor="sort">Sort by:{' '}</label>
        <select onChange={(e) => setSortCriteria(e.target.value)}>
        <option value="date">Date</option>
        <option value="status">Status</option>
        <option value="email">Email</option>
      </select>
      {isLoading && <p>Loading...</p>}
      {!isLoading && sortTickets(tickets, sortCriteria).map((ticket, index) => (
        <div key={ticket.id} className={`ticket-card ${isLoading ? 'ticket-card-initial' : 'ticket-card-loaded'}`}>
          
        {/* <div key={ticket.id} className="ticket-card"> */}
          <h2 className="ticket-name">{ticket.name}</h2>
          <p className="ticket-email">Email: {ticket.email}</p>
          <p className="ticket-description">Description: {ticket.description}</p>
          <p className="ticket-status">Status: {ticket.status}</p>
          <p className="ticket-date">Date Submitted: {new Date(ticket.date).toLocaleString()}</p>
          <br />
          <select
            className="status-select"
            value={ticket.status}
            onChange={(e) => handleResponseSubmit(ticket.id.toString(), 'status', e.target.value)}
          >
            <option>{ticket.status}</option>
            <option>New</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <br/>
          <br/>

          {ticket.showResponseForm ? (
            <div>
              <textarea
                ref={responseTextareaRef} // Set the ref for the textarea element
                rows={3}
                placeholder="Enter your response..."
                // value={responseText}
                // onChange={(e) => setResponseText(e.target.value)}
              />
              <button onClick={() => handleResponseSubmit(ticket.id.toString(), 'response_response', responseTextareaRef.current?.value,)}>
                Submit
              </button>
            </div>
          ) : (
            <button className="response-button" onClick={() => handleResponseButtonClick(ticket.id)}>
              Respond
            </button>
          )}

          {ticket.response_response &&
            // ticket.responses.map((response: any, index: number) => (
              <div key={index} className="response-item">
                <button className="response-button">Response from {ticket.resonse_name}</button>
                <div className="response-content">
                  <p className="response-text">{ticket.response_response}</p>
                  <p className="response-date">
                    Date Responded: {ticket. dateResponded} 
                    {/* {formatDateTime(ticket.date, ticket.time)} */}
                  </p>
                </div>
              </div>
            // ))
            }
           
        </div>
      ))}
    </div>
  );
};

export default TicketList;