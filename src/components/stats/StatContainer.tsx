import React, { useState, useEffect } from 'react';
import Counts from "./Counts";
import Emails from "./Emails";
import Graph from "./Graph";
import { Ticket } from '../../sampleData/data';
import "./stats.css"

interface TicketListProps {
  tickets: Ticket[];
  isTriggerUpdate: boolean;
}


const url: string = 'http://helpdesk-env2.eba-ijmntygi.us-east-1.elasticbeanstalk.com/tickets'


/**
 * Renders a list of tickets and associated components.
 *
 * @param {TicketListProps} tickets - The list of tickets to render.
 * @param {boolean} isTriggerUpdate - A flag indicating whether an update is triggered.
 * @return {ReactElement} The rendered ticket list component.
 */
const TicketList: React.FC<TicketListProps> = ({ tickets, isTriggerUpdate}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ticketsState, setTicketsState] = useState(tickets)

  if(!tickets){
    return <div></div>
  }
  

  /**
   * Fetches data from the specified URL and updates the state accordingly.
   *
   * @return {Promise<void>} - A promise that resolves when the data has been fetched and the state has been updated.
   */
  const fetchData = async () => {
    setIsLoading(true);
    try {
    //   const response = await fetch('http://helpdesk-env2.eba-ijmntygi.us-east-1.elasticbeanstalk.com/tickets');
    const response = await fetch(url);
      const data = await response.json();
      setTicketsState(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isTriggerUpdate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {isLoading && <p>Loading statistics...</p>}
    {tickets.length > 0 && !isLoading &&
    <div className="grid-container">
    <div className="grid-item"><Counts tickets={ticketsState} /></div>
      <div className="grid-item"><Emails tickets={ticketsState} /></div>
      <div className="grid-item"><Graph tickets={ticketsState} /></div>
    </div>
    }
    </>
  );
};

export default TicketList;