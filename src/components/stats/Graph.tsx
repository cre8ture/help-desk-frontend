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
  
  interface StatusCountProps {
    tickets: Ticket[];
  }
  


const StatusGraph: React.FC<StatusGraphProps> = ({ tickets }) => {
  const statusCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxCount = Math.max(...Object.values(statusCounts));

  return (
    <div>
      <h2>Status Graph</h2>
      {Object.entries(statusCounts).map(([status, count]) => (
        <div key={status}>
          <span>{status}</span>
          <div style={{ background: 'blue', width: `${(count / maxCount) * 100}%`, height: '20px' }} />
        </div>
      ))}
    </div>
  );
};

export default StatusGraph;
