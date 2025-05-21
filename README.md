# Health App

## Description
A web application for managing patient records.

## Features
*   User registration and sign-in
*   Add new patients
*   View patient details
*   Edit patient information
*   Delete patients
*   Manage patient payments

## Technologies Used
*   Node.js
*   Express
*   MongoDB (with Mongoose)
*   EJS (Embedded JavaScript templates)
*   Body-parser
*   Express-validator
*   Bootstrap (via Bower)
*   jQuery (via Bower)

## Setup and Installation
1.  Clone the repository.
2.  Install Node.js and MongoDB if not already installed.
3.  Navigate to the project directory.
4.  Install project dependencies: `npm install`
5.  Install front-end dependencies: `bower install` (Make sure Bower is installed globally: `npm install -g bower`)
6.  Ensure your MongoDB server is running. The application connects to `mongodb://localhost:27017/health-app`.
7.  Start the application: `npm start` or `npm run devstart` (for development with nodemon).
8.  Access the application at `http://localhost:4000`.

## Project Structure
*   `app.js`: Main application file containing server setup, routes, and middleware.
*   `models/`: Contains data schemas for MongoDB (e.g., `patients.js`, `users.js`).
*   `public/`: Static assets like images, stylesheets, and client-side JavaScript (including `bower_components`).
*   `views/`: EJS templates for rendering HTML pages.

## Contributing
Contributions are welcome. Please open an issue or submit a pull request.

## License
This project is licensed under the ISC License.
