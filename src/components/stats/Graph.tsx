import React from 'react';
import { Ticket } from '../../sampleData/data';

interface StatusGraphProps {
  tickets: Ticket[];
}

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StatusGraph: React.FC<StatusGraphProps> = ({ tickets }) => {
  const statusCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxCount = Math.max(...Object.values(statusCounts));

  return (
    <div style={{ maxWidth: '300px' }}>
      <h2>Status Graph</h2>
      {Object.entries(statusCounts).map(([status, count]) => (
        <div key={status}>
          <span>{status}</span>
          <div
            style={{
              background: generateRandomColor(),
              width: `${(count / maxCount) * 100}%`,
              height: '20px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'width',
              transitionDuration: '500ms',
              transitionTimingFunction: 'ease-in',
            }}
          >
            {count}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusGraph;