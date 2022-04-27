const db = require("../model");
const userDetails = db.user;
const userType = db.userType;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
var enums = require("../model/enums.js");
var bookHistory = db.bookHistory;



exports.create = (req, res) => {
  var points = 0;
  // Validate request
  if (!req.body.userTypeId) {
    res.status(400).send({
      message: "Role can't be empty.",
    });
    return;
  }
  userType.findOne({ where: { id: { [Op.eq]: req.body.userTypeId } } }).then(function (role) {
    if (role) {
      points = role.dataValues.points;
      // Create a User
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        location: req.body.location,
        language: req.body.language,
        email: req.body.email,
        password: req.body.password,
        userTypeId: req.body.userTypeId,
        awardPoints: points
      };

      // Save User Details in the database
      userDetails
        .create(user)
        .then((data) => {
          res.status(200).send({
            message: "User has been created Successfully.",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            message: err.message || "Some error occurred while creating the User.",
          });
        });
    }
  });

};

// find user using email id an password

exports.findOne = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  var cond = { email: { [Op.eq]: `${username}` } };

  userDetails.findOne({ where: cond }).then(function (user) {
    if (!user) {
      res.status(404).send({
        code: 404,
        status: "FAILURE",
        message: "No user found with the specified username",
      });
    } else if (!bcrypt.compareSync(password, user.dataValues.password)) {
      res.status(400).send({
        code: 400,
        status: "FAILURE",
        message: "Invaild Password",
      });
    } else {
      req.session.user = user.dataValues.email;
      res.send({
        code: 200,
        status: "SUCCESS",
        message: "Logged in Successfully",
      });
    }
  });
};

exports.userDetails = (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    // if (true) {
    const email = req.session.user;
    // const email = "publisher@gmail.com";

    const cond = { email: { [Op.eq]: `${email}` } };

    userDetails
      .findOne({
        where: cond,
        include: [
          {
            model: userType,
            as: "userType",
            attributes: ["id", "type"],
          },
        ],
      })
      .then(function (dtl) {
        if (dtl) {
          req.session.user = email;
          var trsBooks = 0;
          var rvwBooks = 0;
          var pubBooks = 0;
          if (dtl.dataValues.userType.dataValues.type == enums.TRL) {
            userType.findOne({ where: { type: { [Op.eq]: enums.RVW } } }).then(function (role) {
              if (role) {
                var histCond = {
                  user: { [Op.eq]: dtl.dataValues.id },
                  updatedstatus: { [Op.eq]: enums.PCT }
                };
                // var cond = {
                //   langId: { [Op.eq]: `${langId}` },
                //   bookId: { [Op.eq]: `${bookId}` },
                //   // status: { [Op.eq]: enums.AVL },
                // };
                bookHistory.findAll({ where: histCond }).then(function (hist) {
                  for (var i = 0; i < hist.length; i++) {
                    if (hist[i].dataValues.userStatus == enums.TCT) {
                      trsBooks++;
                    }
                  }

                  res.send({
                    firstName: dtl.dataValues.firstName,
                    lastName: dtl.dataValues.lastName,
                    age: dtl.dataValues.age,
                    location: dtl.dataValues.location,
                    language: dtl.dataValues.language,
                    usertypeValue: dtl.dataValues.userType.dataValues.type,
                    awardPoints: dtl.dataValues.awardPoints,
                    maxPoints: role.dataValues.points,
                    translatedBooks: trsBooks
                  });
                });
              }
            });
          }
          else if (dtl.dataValues.userType.dataValues.type == enums.RVW) {
            userType.findOne({ where: { type: { [Op.eq]: enums.PBL } } }).then(function (role) {
              if (role) {
                var histCond = {
                  user:
                    { [Op.eq]: dtl.dataValues.id }, updatedstatus: { [Op.eq]: enums.PCT }
                }
                bookHistory.findAll({ where: histCond }).then(function (hist) {
                  for (var i = 0; i < hist.length; i++) {
                    if (hist[i].dataValues.userStatus == enums.TCT) {
                      trsBooks++;
                    }
                    else if (hist[i].dataValues.userStatus == enums.RCT) {
                      rvwBooks++;
                    }
                  }

                  res.send({
                    firstName: dtl.dataValues.firstName,
                    lastName: dtl.dataValues.lastName,
                    age: dtl.dataValues.age,
                    location: dtl.dataValues.location,
                    language: dtl.dataValues.language,
                    usertypeValue: dtl.dataValues.userType.dataValues.type,
                    awardPoints: dtl.dataValues.awardPoints,
                    maxPoints: role.dataValues.points,
                    translatedBooks: trsBooks,
                    reviewedBooks: rvwBooks
                  });
                });
              }
            });

          }
          else if (dtl.dataValues.userType.dataValues.type == enums.PBL) {
            userType.findOne({ where: { type: { [Op.eq]: enums.PBL } } }).then(function (role) {
              if (role) {
                var histCond = { user: { [Op.eq]: dtl.dataValues.id }, updatedstatus: { [Op.eq]: enums.PCT } }
                bookHistory.findAll({ where: histCond }).then(function (hist) {
                  for (var i = 0; i < hist.length; i++) {
                    if (hist[i].dataValues.userStatus == enums.PCT) {
                      pubBooks++;
                    }

                  }
                  res.send({
                    firstName: dtl.dataValues.firstName,
                    lastName: dtl.dataValues.lastName,
                    age: dtl.dataValues.age,
                    location: dtl.dataValues.location,
                    language: dtl.dataValues.language,
                    usertypeValue: dtl.dataValues.userType.dataValues.type,
                    awardPoints: dtl.dataValues.awardPoints,
                    maxPoints: role.dataValues.points,
                    publishedBooks: pubBooks
                  });
                });
              }
            });
          }
        }
        else {
          req.session.user = email;
          res.status(500).send({
            code: 500,
            status: "FAILURE",
            message: "Internal Server Error",
          });
        }
      });
  }
  else {
    res.status(403).send({
      code: 403,
      status: "FAILURE",
      message: "Authetication Error",
    });
  }


}

exports.logout = (req, res) => {
  res.clearCookie("user_sid");
  req.session.destroy((err) => {
    if (err) throw err;
    res.status(200).send({ message: "Success" });
  });
};
