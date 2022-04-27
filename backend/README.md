The backend directory contains all the code related to APIS and data fetching. The code is built using node js and express. Please head over to the project configuration guide, if you haven't set up the project yet.

1. DB scripts contains sql commands that will come in handy to insert books data and any other required information in the database.

2. APIcalls.md contains the api calls used in the project and their purpose.

3. db config.js is the configuration file for your sql database in use. Make changes to the password and set the password same as what you have set for mysql before you use the application.

4. Package.json contains required dependenceies, use npm install to download dependencies.

5. server.js file is the start up file that is the entry point of the code. use node server.js / nodemon server.js to run the project.

6. The API folder has 3 parts:
   -- Model : Containing the database schema of different types of records
   -- Controllers : Conatins code to fetch information from database using these schemas and sql queries
   -- routes : contains the endpoints which the frontend application can use to mkae the requests.
