import React, { useState, useEffect, useRef } from 'react';
import Stats from "./stats/StatContainer"
// import Emails from "./stats/Emails"
// import Graph from "./stats/Graph"


interface TicketListProps {
}


/**
 * Renders a list of tickets with sorting functionality and the ability to respond to each ticket.
 *
 * @return {React.ReactNode} The rendered ticket list component
 */
const TicketList: React.FC<TicketListProps> = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('date');
  const [isTriggerGraphUpdate, setIsTriggerGraphUpdate] = useState(false);


  // Sorting function
  const sortTickets = (tickets: any, criteria: any) => {
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
  const responseTextareaRef = useRef<HTMLTextAreaElement | any>(null);

  /**
   * Toggles the showResponseForm state for the clicked ticket and focuses on the textarea element when showing the response form.
   *
   * @param {number} ticketId - The ID of the ticket that was clicked.
   */
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

  /**
   * Handles the submission of a response.
   *
   * @param {string} id - The ID of the ticket to update.
   * @param {string} fieldToChange - The field to update in the ticket.
   * @param {any} newValue - The new value for the field.
   * @return {Promise<void>} - A promise that resolves once the response is handled.
   */

  const handleResponseSubmit = async (id: any, fieldToChange: string, newValue: string) => {
    try {
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
        setIsTriggerGraphUpdate(!isTriggerGraphUpdate);
        console.log('Ticket updated successfully. Would normally send email here with body: ...!');
        if (fieldToChange === 'status') {
          const statusElement = document.getElementById(`response-status-${id}`);
          const responseSelectElement: any = document.getElementById(`response-select-${id}`);
          if (statusElement) {
            statusElement.textContent = `Status: ${newValue}`;
            responseSelectElement.value = newValue;
          }

        } else if (fieldToChange === 'response_response') {
          let responseElement = document.getElementById(`response-text-${id}`);
          let dateElement = document.getElementById(`response-date-${id}`);
          let textarea: any = document.getElementById(`responseTextarea-${id}`);
          if (responseElement && dateElement && textarea) {
            responseElement.textContent = `Response: ${newValue}`;
            dateElement.textContent = `Date Responded: ${new Date().toLocaleString()}`;
            textarea.value = '';
          }
          else {
            const responseItemHidden: any = document.getElementById(`response-item-hidden-${id}`);
            responseItemHidden.style.display = 'block';
          }
        }
      } else {
        console.error('Failed to update ticket');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  /**
   * Fetches data from the specified URL and updates the state with the fetched data.
   *
   * @return {void} 
   */
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://helpdesk-env2.eba-ijmntygi.us-east-1.elasticbeanstalk.com/tickets');
      const data = await response.json();
      const ticketsWithResponseForm = data.map((ticket: any) => ({ ...ticket, showResponseForm: false }));
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
      <h1 className="title">Welcome, agent!</h1>

      {isLoading && <p>Loading...</p>}
      {tickets.length === 0 && <p>No tickets found, Yay!</p>}

      <Stats tickets={tickets} isTriggerUpdate={isTriggerGraphUpdate}/>
      <br />
      <br />
      <h3>Tickets</h3>
      <label htmlFor="sort">Sort by:{' '}</label>
      <select onChange={(e) => setSortCriteria(e.target.value)}>
        <option value="date">Date</option>
        <option value="status">Status</option>
        <option value="email">Email</option>
      </select>
      {isLoading && <p>Loading...</p>}
      {!isLoading && sortTickets(tickets, sortCriteria).map((ticket, index) => (
        <div key={ticket.id} className={`ticket-card ${isLoading ? 'ticket-card-initial' : 'ticket-card-loaded'}`}>

          <h4 className="ticket-name">{ticket.name}</h4>
          <p className="ticket-email"><label> Email: </label> {ticket.email}</p>
          <p className="ticket-description"><label> Description: </label>{ticket.description}</p>
          <p id={`response-status-${ticket.id}`} className="ticket-status"><label>Status: </label>{ticket.status}</p>
          <p className="ticket-date"><label> Date Submitted:</label> {new Date(ticket.date).toLocaleString()}</p>
          <p>--------------------------</p>
          <select
            id={`response-select-${ticket.id}`}
            className="status-select"
            value={ticket.status}
            onChange={(e) => handleResponseSubmit(ticket.id.toString(), 'status', e.target.value)}
          >
            <option>new</option>
            <option>in progress</option>
            <option>resolved</option>
          </select>
          <br />
          <br />

          {ticket.showResponseForm ? (
            <div id={`response-form-${ticket.id}`} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea
                id={`responseTextarea-${ticket.id}`}
                ref={responseTextareaRef} // Set the ref for the textarea element
                rows={3}
                placeholder="Enter your response..."
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

          <div id={`response-container-${ticket.id}`} className="response-container" style={{ display: 'block' }}>
            <div id={`response-item-hidden-${ticket.id}`} key={index} className="response-item">
              <div className="response-content">
                <p id={`response-text-${ticket.id}`} className="response-text"><label>Response: </label> {ticket.response_response ? ticket.response_response : <span style={{ color: 'red' }}>Awaiting a response from an agent</span>}</p>
                <p className="response-date">
                  <label id={`response-date-${ticket.id}`} >Date Responded:</label> {ticket.dateResponded && new Date(ticket.dateResponded).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default TicketList;