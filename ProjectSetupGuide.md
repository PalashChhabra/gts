The project structure is segregated into two parts, Frontend and Backend. The frontend contains code for Frontend screens while the backend contains code for the APIs and database setup.

::::Set up front-end of the project::::

Step-1) This frontend is built upon react, so you would require to have node and npm installed
Step-2) Assuming that the code is cloned/ unzipped into a IDE like VSCode,
Step-2) cd to frontend folder
Step-3) run "npm install" in the same terminal directory (this will install all the required dependenices)
Step-4) run "npm start", this should open the startup (login) screen in a browser.
Step-5) Since the frontend code is hosted on port 3000 while we would run the backend code on port 5000, Chrome and other browsers don't support this cross domain serving of request-response, (CORS policy). To handle this, you would need to open chrome with disabled web security.
Step-6) To open, Chrome without web security, Close any running instance of Chrome and use the following command:

For windows: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession"

For Mac : open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

Step-7) Open localhost:3000/ on the new chrome window and frontend code is ready to be served.

Further, if you want to KNOW MORE about what each component does in the frontend code, head over to the README.md file in FRONTEND folder.

::::Set up back-end of the project::::

The back-end folder of the project is little complex to begin with and each step must be followed thoroughly:

Step-1: Install Node and npm (the backend is built upon node and express)

Step-2: Assuming that the code is cloned/ unzipped into a IDE like VSCode, cd to backend folder

Step-3: Run "npm install" in the same terminal directory (this will install all the required dependenices)

Step-4: The database being used for this project is mysql, so to set up a database configuration, mysql and mysql workbench (DEVELOPMENT RELEASE) is required to be installed.

IMPORTANT: Use legacy password option in the Installation settings step while you're installing mysql.
for Mac OS : use legacy passowrd option is in preferences.

Step-5: Once mysql is installed, open MYSQL SHELL or TERMINAL that was installed with mysql; change to mysql editor (if editor is in JS moode) to be able to input mysql commands

Step-6: Enter the following commands (impt to set up the root connection):
ALTER USER 'yourusername'@'localhost' IDENTIFIED WITH mysql_native_password BY 'youpassword';
flush privileges;

ex: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'test@123';
flush privileges;

Step-7 (OPTIONAL) : If the above command does not work, there is a connection error with mysql.

To fix this:
--- Go to the mysql folder and cd to bin and then do the below on terminal/console in that directory
--- Enter the following commands
c:\mysql\bin>mysqld --install
c:\mysql\bin>mysqld --initialize
--- Then press "Windows key + R" write "services.msc", run as admin (for windows)
--- Look for MySql service (80 if available), stop and restart the service.

--- Steps here : https://stackoverflow.com/questions/10892689/cant-connect-to-mysql-server-on-localhost-10061-after-installation

-- Once all of this is done, sql is connected

Step-8: The next step is to create a database for the project. To do this, open SQL command Line again and tyoe:
create database gts;

Step-9: After creation of database, for the first time, the project code needs to sequalise the database. To do this,
There are two steps to follow:

1. Open dbconfig.js AND index.js file in backend/model and on line ~7 change the password to what you have set. This will allow the project to connect to sql database.
2. Open server.js and on line ~46 set {force:true} inside db.sequelize.sync(). This will look like this:
   db.sequelize.sync({force:true}).then(() => {
   console.log("Drop and re-sync db.");
   });
3. Once this is done, run node server.js in the BACKEND folder
4. IMPORTANT: Make sure to remove the force:true, right after the first time otherwise it will drop the tables everytime.

Step-10: Now the backend configurations are complete, you can run the backend again using node server.js or nodemon server.js (nodemon allows you to make changes and not reload)

Step-11: Open Chrome browser with Diable webs security mode. This is because the frontend and backend server created are on different domains and chrome blocks api requests with cross domains.

For windows: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession"

For Mac : open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

Further, if you want to KNOW MORE about what each component does in the backend code, head over to the README.md file in BACKEND folder.

IMPORTANT TO KNOW: This conifiguartions only allow to set up the project, the books data still needs to be inserted to the database for view. Head over to file DB scripts/bookData.md to see how book data can be inserted.

NEXT STEP: API calls.md and DB Scripts/bookData.md

**\***NOTE:**\***
If you ever use force:true to drop tables, delete all the files in the TranslatedBooks folder.
