const express = require("express");
const bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");

const app = express();
app.use(express.static("documents"));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// To use static content
app.use("/resources", express.static(__dirname + "/documents"));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "gts_sid",
    resave: true,
    rolling: true,
    cookie: { httpOnly: false, maxAge: 1 * 60 * 60 * 1000 },
  })
);

// To check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie('user_sid');
//   }
//next();
// });

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Global Transalation System." });
});

// To Synchronize the database
const db = require("./api/model");
db.sequelize.sync();

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

// set port, listen for requests
const PORT = 9000;
require("./api/routes/Router")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
