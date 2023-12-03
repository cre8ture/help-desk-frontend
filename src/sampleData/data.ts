// provides a type for Ticket and a sample data object for testing purposes

export interface Ticket {
  id: number;
  name: string;
  email: string;
  description: string;
  status: string;
  date: string;
  response_response: string;
  response_name: string;
  dateResponded: string;

}


export const data: { tickets: Ticket[] } = {
    "tickets": [
    
    ]
  }