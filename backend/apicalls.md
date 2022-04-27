The file conatins the list of APIs and their usage across the project.

Note: Please install Postman application, in order to run the apis and send in the required data. Open postman, set the type of request. (GET or POST)
Go to the body tab, select raw text and select JSON option to be able able to insert request req. paramaters.

Make sure you have server.js running and hosted on port 5000

**_User Creation_**
If the registration component isn't working/ not ready / you want to create a user manually. You can follow the following APIs.

The first step is to create a user type: (translator / reviewer / languagecoordinator / admin)
API : http://localhost:5000/api/createUserType
Type: POST
body:
{
"type":"Translator",
"points":0
}

The next step is to create a user:
API: http://localhost:5000/api/register
Type: POST
body:
{
"firstName": "Palash",
"lastName": "Chhabra",
"age": "26",
"location": "India",
"language": "English, Chinese",
"email": "translator@gmail.com",
"password":"test",
"userTypeId": 1
}

OPTIONAL:
API: http://localhost:5000/api/getUserType
type: GET
Purpose: Read all users of a user type

**_LOGIN_**
API: http://localhost:5000/api/login
type: POST
Purpose: log in the user

**_LOGOUT_**
API: http://localhost:5000/api/logout
type: POST
Purpose: logout the user

**_GET USER DETAILS_**
API: http://localhost:5000/api/getUserDetails
type: GET
Purpose: get user details for home page (dashboard)

**_GETTING BOOK DATA_**
API: http://localhost:5000/api/getBooks
type: GET
Purpose: fetch all books info from mappingbooktrans table

**_SAVING TRANSLATED BOOK DATA_**
API: http://localhost:5000/api/saveBook
type: POST
Purpose: Save a Translated Book
Request Body:

{
"langId":3,
"bookId":1,
"content":"data"
}

**_GETTING IN PROGRESS TRANSLATED BOOK DATA_**
API: http://localhost:5000/api/resumeTranslation
type: GET
Purpose: fetch all in progress books from mappingbooktrans table
Query Params : langId,bookId

**_GETTING BOOK DATA BY STATUS_**
API: http://localhost:5000/api/getBooksByStatus
type: GET
Purpose: Get the books by their status
Query Param: status

**PUBLISH BOOK**
API: http://localhost:5000/api/updateBookStatus
type: POST
Purpose: Publish a Translated Book
Request Body:

{
"langId":3,
"bookId":1,
"content":"data"
}

**_DISCARD BOOK_**
API: http://localhost:5000/api/discardTranslation
type: POST
Purpose: Discard the Translation of selected Book
Request Body:

{
"langId":3,
"bookId":1
}

**_REJECT BOOK_**
API: http://localhost:5000/api/reject
type: POST
Purpose: Reject the Translation of selected Book
Request Body:

{
"langId":3,
"bookId":1
}

**_DISPLAY USER TRANSLATION/REVIEW/PUBLISH HISTORY_**
API: http://localhost:5000/api/getHistory
type: GET
Purpose: Get the translation/review/publishing history of user
Response:
backend/JSON Response/bookHistory.json : for table columns

Structure:
[
{
"translationHistory": [

]
},
{
"reviewHistory": [

]
},
{
"publishingHistory": [
]
}
]
