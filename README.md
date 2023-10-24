# real_time_task_manager

## Overview:
The "real_time_task_manager" is a real-time task management application designed to streamline task assignments within an organization. Users can create, assign, and manage tasks in real-time, enhancing collaboration and productivity.


## Backend Installation
To set up the backend server, navigate to the 'server' directory and follow these steps:

1. Ensure you have Node.js and npm installed.
2. Install project dependencies using `npm install`.
3. Start the server with the command `npm start`.

## Frontend Installation
To set up the frontend client, navigate to the 'client' directory and follow these steps:

1. Ensure you have Node.js and npm installed.
2. Install project dependencies using `npm install`.
3. Start the client with the command `npm start`.


## Security Code:
1. When a user selects the role as 'admin,' they must verify themselves by entering the security code. The security code is "Verify989693@sEcutirY," and it's required to gain admin privileges within the application.
2. <Strong>Security Code=Verify989693@sEcutirY</strong>;

## Key Functionalities
- User management (login and signup)
- JWT authentication using RS256 algorithm
- Task management:
  - Create tasks
  - Read tasks
  - Update tasks
  - Delete tasks
- Role-based access control:
  - Normal users can manage their own tasks and tasks assigned to others.
  - Admins can manage all tasks within the organization.



## Postman Documentation
For detailed API documentation and examples, please refer to our Postman collection. The collection provides endpoints and sample requests for interacting with our API.

[View Postman Documentation](https://documenter.getpostman.com/view/24723633/2s9YRDypdv)


## Technical Stacks

### Frontend
- React.js
- HTML
- CSS
- Chakra.UI library
- Socket.io-client

### Backend
- Node.js
- Express.js
- Socket.io
- NPM Packages

### Database
- MongoDB


