import React from 'react';
import { Ticket } from '../../sampleData/data';


interface StatusCountProps {
  tickets: Ticket[];
}

const StatusCount: React.FC<StatusCountProps> = ({ tickets }) => {
  const statusCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h3>Status Counts</h3>
      {Object.entries(statusCounts).map(([status, count]) => (
        <p style={{fontSize:'20px'}} key={status}>{`${status}: ${count}`}</p>
      ))}
    </div>
  );
};

export default StatusCount;
