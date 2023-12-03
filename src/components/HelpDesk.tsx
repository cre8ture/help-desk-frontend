import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadFromLocalStorage } from '../utils/localStorage';
import { Ticket } from '../sampleData/data';
import Form from './Form';

const url:string = 'https://d1yhu19u1ntxvm.cloudfront.net/tickets'
let userEmail2: any;


const TicketList: React.FC = () => {
const[userEmail, setUserEmail] = useState<string | null>(loadFromLocalStorage("helpdesk_sample"));
  
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);


const getEmail = async () => {  
     userEmail2 = await loadFromLocalStorage("helpdesk_sample")
     setUserEmail(userEmail2)
}

const fetchData = async () => {
  try {
    // const response = await fetch('http://helpdesk-env2.eba-ijmntygi.us-east-1.elasticbeanstalk.com/tickets');
    const response = await fetch(url);

    const data = await response.json();

    setTickets((prevTickets) => {
      const updatedTickets = prevTickets ? [...prevTickets, ...data] : data;
      return updatedTickets;
    });

    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    setIsLoading(false);
  }
};


  useEffect(() => {
    getEmail()
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userEmail || userEmail2}. How can we help you?</h1>
      <Form fetchData={fetchData}  />
      <h2>Your Tickets:</h2>
      {tickets && tickets.length > 0 ? (
        <div>
          {tickets
            .filter((ticket) => ticket.email === userEmail)
            .map((ticket) => (
              <div key={ticket.id + uuidv4()} style={{ marginBottom: '20px' }}>
                {/* Render ticket details here */}
                <h3>{ticket.name}</h3>
                <p>Email: {ticket.email}</p>
                <p>Description: {ticket.description}</p>
                <p>Status: {ticket.status}</p>
                <p>Date Submitted: {ticket.date} </p> 
                {/* formatDateTime(ticket.date, ticket.time)} */}
                  {ticket.response_response 
                  &&
                   <div>
                      <strong>Response from {ticket.response_name}:</strong> {ticket.response_response}
                      <p>Date: {new Date(ticket.dateResponded).toLocaleString()}</p>
                    </div>
                  }
                <br/>
                <hr />
              </div>
            ))}
        </div>
      ) : (
        <div>No tickets found.</div>
      )}
    </div>
  );
};

export default TicketList;
