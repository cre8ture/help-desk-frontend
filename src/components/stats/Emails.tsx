import React from 'react';
import { Ticket } from '../../sampleData/data';

  

interface MostTicketsEmailProps {
  tickets: Ticket[];
}

const MostTicketsEmail: React.FC<MostTicketsEmailProps> = ({ tickets }) => {
  const emailCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.email] = (acc[ticket.email] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostTicketsEmail = Object.entries(emailCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

  return (
    <div>
      <h3>Email with Most Tickets</h3>
      <p style={{fontSize:'20px'}}>{mostTicketsEmail}</p>
    </div>
  );
};

export default MostTicketsEmail;
