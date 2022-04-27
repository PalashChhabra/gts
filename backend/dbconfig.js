var mysql = require("mysql");

var con = mysql.createConnection({
  HOST: "localhost",
  PORT: 3306,
  USER: "root",
  PASSWORD: "test@123",
  DB: "gts",
});

// con.connect(function(err) {
//   if (err) throw err;
// });

// console.log("Connected!");

//module.exports = con;

/*var sql = "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) UNIQUE KEY, password VARCHAR(255), createdDate Date,updatedDate Date)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });*/

con.query("CREATE DATABASE GTS", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});
