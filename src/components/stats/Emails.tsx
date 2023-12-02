import React from 'react';

interface Ticket {
    id: number;
    name: string;
    email: string;
    description: string;
    date: string;
    time: string;
    status: string;
  }
  

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
      <h2>Email with Most Tickets</h2>
      <p>{mostTicketsEmail}</p>
    </div>
  );
};

export default MostTicketsEmail;
