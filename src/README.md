# Help Desk

This is a sample help desk project for managing customer support tickets. Please note that this is a developmental version and should not be used in a production environment.

## Usage

To access the help desk, navigate to the root URL (`/`) and enter your email address. This will allow you to submit support tickets.

To access the agent dashboard and view/respond to tickets, navigate to `/agent-dashboard`.

## Potential Issues and Security Risks

- **No Authorization**: Currently, there is no authorization mechanism implemented in this version of the help desk. This means that anyone with the URL can access the agent dashboard and modify tickets. It is recommended to implement a proper authentication and authorization system to ensure that only authorized users can access the agent dashboard.

- **Insecure Data Storage**: The current version of the help desk may not store sensitive user data securely. It is important to implement proper encryption and secure storage mechanisms to protect user information.

- **Lack of Input Validation**: The application may not validate user input properly, which can lead to security vulnerabilities such as SQL injection or cross-site scripting (XSS) attacks. It is crucial to implement input validation and sanitization to prevent these issues.

## Improvements

To improve this help desk project, consider implementing the following:

- **Authentication and Authorization**: Implement a secure authentication and authorization system to ensure that only authorized users can access the agent dashboard and perform actions on tickets.

- **Secure Data Storage**: Store user data securely by implementing encryption and following best practices for secure storage.

- **Input Validation and Sanitization**: Implement proper input validation and sanitization to prevent security vulnerabilities.

- **Error Handling**: Enhance the error handling mechanism to provide meaningful error messages to users and log errors for debugging purposes.

- **Testing**: Implement automated tests to ensure the stability and reliability of the help desk application.

- **Documentation**: 
- clone this repo
- navigate to the root directory
- type into the command line `npm install`
- type into the command line `npm run dev`
- you will also need to ensure the backend is up and running

- **Technoloy**:
- The main tech stack used in the "my-react-project" is as follows:

- React version 18.2.0
- React DOM version 18.2.0
- React Router DOM version 6.20.0

The project also has the following dev dependencies:

- Typescript version 5.2.2
- Vite version 5.0.0
- Additionally, there are several ESLint plugins and types dependencies used for linting and type-checking the code.

Let me know if you need more information!



