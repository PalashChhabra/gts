module.exports = app => {
  const usertype = require("../controllers/usertypeController.js");
  const book = require("../controllers/bookController.js");
  const user = require("../controllers/userController.js");
  const mapping = require("../controllers/mappingController.js");
  const bookHistory = require("../controllers/bookHistoryController.js");

  var router = require("express").Router();
  var session = require('express-session');

  // Create a new UserType
  router.post("/createUserType", usertype.create);

  // Retrieve all UserTypes
  router.get("/getUserType", usertype.findAll);

  // Create a new document
  router.post("/addBook", book.add);

  // Add a new user
  router.post("/register", user.create);

  // login user
  router.post("/login", user.findOne);

  // User Details
  router.get("/getUserDetails", user.userDetails);

  //logout 
  router.get("/logout", user.logout);

  //get book_translation details
  router.get("/getBooks", mapping.findAvailableBooks);

  // update books Status
  router.post("/saveBook", mapping.translate);

  // Resume Translation
  router.get("/resumeTranslation", mapping.read);

  //Get Books By different status
  router.get("/getBooksByStatus", mapping.findBooksByStatus);

  //Set the status to Completed
  router.post("/updateBookStatus", mapping.publish);

  //Discard Translation/Review
  router.post("/discardTranslation", mapping.discard);

  //Reject the Translation/Review
  router.post("/reject", mapping.reject);

  //Get History
  router.get("/getHistory", bookHistory.getHistory);

  app.use('/api', router);

};