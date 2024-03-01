# JATA Online Market

## Description

Briefly describe your project, including its purpose and key features.

## Features

- **Separation of Concerns:** Well-organized folder structure for backend and frontend components.
- **Database Management:** MySQL database with Sequelize for migrations and data handling.
- **Web Service:** Eight RESTful APIs provided by the backend for various functionalities and data operations.
- **Firebase Integration:**
  - **Authentication:** Utilizes Firebase for user authentication, ensuring secure access to the application.
  - **Firebase Storage:** Leverages Firebase Storage for efficient storage and retrieval of user-generated content.

- **React Frontend:** Utilizes React for a dynamic and responsive user interface.
- **Additional Web Services:**
  - **PayPal Payment Portal:** Integrated PayPal for secure and seamless payment transactions.
  - **MySQL Database Management:** Provides APIs for efficient management and manipulation of MySQL database records.
  - **Analytical Sales Dashboard:** Employs data analytics for visualizing sales metrics and trends.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js:** Install Node.js from [nodejs.org](https://nodejs.org/).

2. **MySQL Workbench:** Install MySQL Workbench from [dev.mysql.com](https://dev.mysql.com/downloads/workbench/).

3. **Local Database:**
   - Open MySQL Workbench and connect to your local MySQL server.
   - Create a new database named "jatadata" using the following SQL command:
     ```sql
     CREATE DATABASE jatadata;
     ```

   Note: Ensure that your MySQL server is running before attempting to create the database.

4. **Backend Configuration:**
   - Update file `config.json` and `db.config.js` in folder `config` with your MySQL database credentials.
     ` 
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_DATABASE=jatadata
     `
    Replace `your_username` and `your_password` with your MySQL server credentials.
 - Navigate to the `backend` folder  and install dependencies
 
      ```
     cd backend
     npm install
     ```
5. **Frontend and Backend Dependencies:**
 - Open second Terminal, Navigate to the `frontend` folder  and install dependencies
 
      ```
     cd frontend
     npm install
     ```
Now your project is set up with the necessary prerequisites. 


## Getting Started

Follow the steps below to set up and run your project locally.

### Backend

1. **Sync Local MySQL Database:**
   - Make sure your local MySQL server is running.
   - Navigate to the `backend` folder.
   - Run the following command to synchronize your local MySQL database:
     ```
     npm start
     ```
   - This will establish a connection to your local MySQL server and sync the database.

2. **Run Sequelize Migrations:**
   - Once the database is synced, terminate the process (`Ctrl + C`).
   - Run the following command to apply Sequelize migrations and load data into the tables:
     ```
     npx sequelize db:migrate
     ```

### Frontend

1. **Start Frontend Development Server:**
   - Navigate to the `frontend` folder.
   - Start the development server:
     ```bash
     npm start
     ```

2. **Access the App:**
   - Open your web browser and visit [http://localhost:3000](http://localhost:3000).
   - You should see your React app running locally.

Now your project's backend is synchronized with the local MySQL database, and the frontend is accessible at [http://localhost:3000](http://localhost:3000). 
backend is accessible at [http://localhost:8080](http://localhost:8080).



## Folder Structure

Briefly describe the purpose of each major folder in your project.

```plaintext
project-root/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── migrations/         # Store data for "jatadata" database
│   ├── models/
│   ├── routes/
│   ├── index.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── firebase/       # Firebase configuration and services
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    └── index.css
    ├── package.json
