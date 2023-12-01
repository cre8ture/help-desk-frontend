// data.ts

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


export const data: { tickets: Ticket[] } = {
    "tickets": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "description": "I am having trouble logging in.",
        "status": "new",
        "dateSubmitted": "2022-03-01T12:00:00Z",
        "responses": []
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "description": "My account has been locked.",
        "status": "in progress",
        "dateSubmitted": "2022-03-02T15:30:00Z",
        "responses": [
          {
            "staffName": "Support Staff 1",
            "response": "We are looking into your issue.",
            "dateResponded": "2022-03-02T16:00:00Z"
          }
        ]
      },
      {
        "id": 3,
        "name": "Bob Johnson",
        "email": "bob.johnson@example.com",
        "description": "I can't update my profile information.",
        "status": "resolved",
        "dateSubmitted": "2022-02-28T09:00:00Z",
        "responses": [
          {
            "staffName": "Support Staff 2",
            "response": "Your issue has been resolved.",
            "dateResponded": "2022-02-28T10:00:00Z"
          }
        ]
      }
    ]
  }