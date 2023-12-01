import React from 'react';

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
  responses: Response[];
}

interface Data {
  tickets: Ticket[];
}

interface TicketListProps {
  data: Data;
}

const TicketList: React.FC<TicketListProps> = ({ data }) => {
  return (
    <div className="ticket-list">
      <h1 className="title">Tickets</h1>
      {data.tickets.map((ticket) => (
        <div key={ticket.id} className="ticket-item">
          <h2 className="ticket-name">{ticket.name}</h2>
          <p className="ticket-email">Email: {ticket.email}</p>
          <p className="ticket-description">Description: {ticket.description}</p>
          <p className="ticket-status">Status: {ticket.status}</p>
          <p className="ticket-date">Date Submitted: {new Date(ticket.dateSubmitted).toLocaleString()}</p>
          {ticket.responses.map((response, index) => (
            <div key={index} className="response-item">
              <button className="response-button">Response from {response.staffName}</button>
              <div className="response-content">
                <p className="response-text">{response.response}</p>
                <p className="response-date">Date Responded: {new Date(response.dateResponded).toLocaleString()}</p>
              </div>
            </div>
          ))}
          <select className="status-select" onChange={(e) => console.log('Ticket status changed to ' + e.target.value)}>
            <option>New</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default TicketList;