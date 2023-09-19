Periodic Tables Restaurant Reservation Application
____________________________________________________________________________________

*** LINK TO DEPLOYED VERSIOIN ***
https://resrevfrontend.onrender.com/
____________________________________________________________________________________

Table of Contents:

TABLES API Documentation
	
 Resource: Tables
		
  List Tables
		
  Create a New Table
	
 Resource: Single Table
		
  Read Table Details
		
  Update Table Details
		
  Delete a Table

RESERVATIONS API Documentation
	
 Resource: Reservations
		
  Create a New Reservation
		
  List Reservations
	
 Resource: Single Reservation
		
  Read Reservation Details
		
  Update Reservation Details

SUMMARY SECTION

TECHNOLOGY USED

INSTALLATION INSTRUCTIONS
____________________________________________________________________________________

TABLES API Documentation
Welcome to the Tables API documentation. This API allows you to manage restaurant tables, including seating guests and updating table status.

Resource: Tables
This resource represents the collection of restaurant tables.

List Tables
Description: Retrieve a list of all tables in the restaurant.
URL: GET /api/tables
Response: Returns an array of table objects.

<img width="427" alt="Screen Shot 2023-09-15 at 8 19 38 PM" src="https://github.com/nicholas-hud-dev/starter-restaurant-reservation/assets/123035795/e8829abd-e550-47d9-9a41-3dcf43f6681f">

Create a New Table
Description: Create a new table in the restaurant.
URL: POST /api/tables
Request Body: JSON object with table details.
Response: Returns the created table object.

<img width="454" alt="Screen Shot 2023-09-15 at 8 20 25 PM" src="https://github.com/nicholas-hud-dev/starter-restaurant-reservation/assets/123035795/6405a346-4595-4f6d-8dad-fb33131d26fc">

Resource: Single Table
This resource represents a single restaurant table.

Read Table Details
Description: Retrieve details of a specific table.
URL: GET /api/tables/:table_id
Response: Returns the table object.

Update Table Status
Description: Update the status of a specific table.
URL: PUT /api/tables/:table_id
Request Body: JSON object with table status to update.
Response: Returns the updated table object.

Finish a Table
Description: Finish a specific table.
URL: DELETE /api/tables/:table_id
Response: Returns a success message.
____________________________________________________________________________________

RESERVATIONS API Documentation
Welcome to the Reservations API documentation. This API allows you to manage restaurant reservations, including creating, updating, and listing reservations.

Resource: Reservations
This resource represents the collection of restaurant reservations.

Create a New Reservation
Description: Create a new reservation for the restaurant.
URL: POST /api/reservations
Request Body: JSON object with reservation details.
Response: Returns the created reservation object.

<img width="454" alt="Screen Shot 2023-09-15 at 8 28 42 PM" src="https://github.com/nicholas-hud-dev/starter-restaurant-reservation/assets/123035795/b6425372-d29c-4aba-bbec-d40f63c90324">

List Reservations
Description: Retrieve a list of all reservations.
URL: GET /api/reservations
Response: Returns an array of reservation objects.

<img width="430" alt="Screen Shot 2023-09-15 at 8 31 28 PM" src="https://github.com/nicholas-hud-dev/starter-restaurant-reservation/assets/123035795/49e16e82-a259-47af-bb9b-b15e6d45b430">

Resource: Single Reservation
This resource represents a single restaurant reservation.

Read Reservation Details
Description: Retrieve details of a specific reservation.
URL: GET /api/reservations/:reservation_id
Response: Returns the reservation object.

Update Reservation Details
Description: Update the details of a specific reservation.
URL: PUT /api/reservations/:reservation_id
Request Body: JSON object with reservation details to update.
Response: Returns the updated reservation object.

<img width="445" alt="Screen Shot 2023-09-15 at 8 32 23 PM" src="https://github.com/nicholas-hud-dev/starter-restaurant-reservation/assets/123035795/186c72da-a720-4c2f-a16a-92a71f291e3d">
____________________________________________________________________________________

SUMMARY SECTION

This application allows users to create and view restaurant reservations with information about the customer, such as their name, phone number, reservation day & time, and number of people in the party. Additionally, once a reservation has been created, the party can be seated at a table. Once the party is done eating, the reservation can be finished so that the table is free for the next party. Users are also able to create new tables with name and capacity properties, search for existing reservations by phone number, and edit information regarding existing reservations.
____________________________________________________________________________________

TECHNOLOGY USED

This project is a monorepo that leverages a variety of technologies to deliver its functionality. Here's an overview of the technologies used:

JavaScript: JavaScript is the core programming language for both the front-end (React) and back-end (Express) of the project. It enables dynamic and interactive web development.

React: React is a JavaScript library used for building user interfaces. In this project, React is utilized on the client-side to create a responsive and efficient user interface.

Express: Express.js is a popular Node.js web application framework used on the server-side. It handles routing, middleware, and provides a robust foundation for building RESTful APIs.

CSS: Cascading Style Sheets (CSS) are used to style and design the user interface. CSS ensures that the application looks visually appealing and user-friendly.

SQL: SQL (Structured Query Language) is used for managing and querying the project's relational database. It facilitates data storage, retrieval, and management.

Knex: Knex.js is a SQL query builder for Node.js. It's used to interact with the database, providing an elegant and programmatic way to build database queries.

By combining these technologies, this project delivers a modern and efficient web application. React enables a dynamic user interface, Express handles server-side logic and API interactions, and SQL with Knex manages data storage and retrieval. Together, these technologies create a seamless and feature-rich user experience.
____________________________________________________________________________________

INSTALLATION INSTRUCTIONS

Fork and clone this repository.
Install Node Version Manager
Run nvm install 16.20.1
Run cp ./back-end/.env.sample ./back-end/.env.
Update the ./back-end/.env file with the connection URL's to your ElephantSQL database instance.
Run cp ./front-end/.env.sample ./front-end/.env.
You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5000.
Run npm install to install project dependencies.
Run npm run start:dev to start your server in development mode.
npm test will run all tests, while npm run test:1 will run tests for user story 1, etc.
____________________________________________________________________________________

THANKS FOR READING ME!!!
