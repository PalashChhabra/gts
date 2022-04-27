var fs = require("fs");
var enums = require("../model/enums.js");
const db = require("../model");
const mappings = db.mapping;
const status = db.status;
const book = db.book;
const language = db.language;
const user = db.user;
const userType = db.userType;
const bookHistory = db.bookHistory;

const Op = db.Sequelize.Op;

exports.findAvailableBooks = (req, res) => {
  const userSession = req.session.user;
  const status = req.query.status;
  if (req.session.user && req.cookies.user_sid) {
    // if (req.cookies.user_sid) {
    var userID = [];
    user
      .findOne({
        where: { email: { [Op.eq]: `${userSession}` } },
        include: [
          {
            model: userType,
            as: "userType",
            attributes: ["id", "type"],
          },
        ],
      })
      .then(function (userData) {
        //uid: userData.dataValues.id;
        user_type = userData.dataValues.userType.dataValues.type;
        userID.push(userData.dataValues.id);
        var cond = {};
        if (user_type == enums.RVW && status == enums.TCT)
          cond = {
            status: { [Op.eq]: `${status}` },
            createdBy: { [Op.not]: userID },
          };
        else
          cond = {
            status: { [Op.eq]: `${status}` },
          };
        mappings
          .findAll({
            where: cond,
            include: [
              {
                model: book,
                as: "book",
                attributes: [
                  "id",
                  "title",
                  "language",
                  "pages",
                  "path",
                  "genre",
                  "lfaId",
                  "metaDesc",
                  "keywords",
                ],
              },
              { model: language, as: "language", attributes: ["id", "value"] },
            ],
          })
          .then(function (data) {
            if (data.length > 0) {
              var bookInfo = {};
              var docInfo = [];
              var exists = [];
              var count = 0;
              for (var j = 0; j < data.length; j++) {
                var lang = [];

                if (!bookInfo[data[j].dataValues.book.dataValues.title]) {
                  lang.push(data[j].dataValues.language);
                  bookInfo[data[j].dataValues.book.dataValues.title] = lang;
                } else {
                  lang = bookInfo[data[j].dataValues.book.dataValues.title];
                  lang.push(data[j].dataValues.language);
                  bookInfo[data[j].dataValues.book.dataValues.title] = lang;
                }
              }

              for (var i = 0; i < data.length; i++) {
                count++;
                if (!exists[data[i].dataValues.book.dataValues.title]) {
                  exists[data[i].dataValues.book.dataValues.title] = "exists";
                  docInfo.push({
                    docId: data[i].dataValues.book.dataValues.id,
                    bookTitle: data[i].dataValues.book.dataValues.title,
                    originalLanguage:
                      data[i].dataValues.book.dataValues.language,
                    translationsRequiredIn:
                      bookInfo[data[i].dataValues.book.dataValues.title],
                    approxLength: data[i].dataValues.book.dataValues.pages,
                    docUrl: data[i].dataValues.book.dataValues.path,
                    category: data[i].dataValues.book.dataValues.genre,
                    lfaId: data[i].dataValues.book.dataValues.lfaId,
                    metaDesc: data[i].dataValues.book.dataValues.metaDesc,
                    keywords: data[i].dataValues.book.dataValues.keywords,
                    status: req.query.status,
                  });
                }
              }
              req.session.user = userSession;
              res.send(docInfo);
            } else {
              req.session.user = userSession;
              res.status(500).send({
                code: 500,
                status: "FAILURE",
                message: "Error occurred getting Books list",
              });
            }
          });
      });
  } else {
    res.status(403).send({
      code: 403,
      status: "FAILURE",
      message: "Authentication Error",
    });
  }
};

exports.translate = (req, res) => {
  const usersession = req.session.user;
  if (req.session.user && req.cookies.user_sid) {
    user
      .findOne({
        where: { email: { [Op.eq]: `${usersession}` } },
        include: [
          {
            model: userType,
            as: "userType",
            attributes: ["id", "type"],
          },
        ],
      })
      .then(function (data) {
        userId = data.dataValues.id;
        type = data.dataValues.userType.dataValues.type;
        const langId = req.body.langId;
        const bookId = req.body.bookId;
        const fileContent = req.body.content;
        var cond = {
          langId: { [Op.eq]: `${langId}` },
          bookId: { [Op.eq]: `${bookId}` },
          // status: { [Op.eq]: enums.AVL },
        };

        mappings.findOne({ where: cond }).then((data) => {
          var updateBook = {
            createdBy: userId,
            upatedDate: new Date(),
            file: fileContent,
          };
          if (data.dataValues) {
            if (type == enums.TRL) {
              if (data.dataValues.status == enums.AVL) {
                updateBook = {
                  status: enums.TIP,
                  createdBy: userId,
                  upatedDate: new Date(),
                  file: fileContent,
                };
              }
            } else if (type == enums.RVW) {
              if (data.dataValues.status == enums.AVL) {
                updateBook = {
                  status: enums.TIP,
                  createdBy: userId,
                  upatedDate: new Date(),
                  file: fileContent,
                };
              } else if (data.dataValues.status == enums.TCT) {
                updateBook = {
                  status: enums.IR,
                  createdBy: userId,
                  upatedDate: new Date(),
                  file: fileContent,
                };
              }
            } else if (type == enums.PBL) {
              if (data.dataValues.status == enums.AVL) {
                updateBook = {
                  status: enums.TIP,
                  createdBy: userId,
                  upatedDate: new Date(),
                  file: fileContent,
                };
              } else if (data.dataValues.status == enums.TCT) {
                updateBook = {
                  status: enums.IR,
                  createdBy: userId,
                  upatedDate: new Date(),
                  file: fileContent,
                };
              } else if (data.dataValues.status == enums.RCT) {
                updateBook = {
                  status: enums.PIP,
                  createdBy: userId,
                  upatedDate: new Date(),
                  file: fileContent,
                };
              }
            }

            mappings.update(updateBook, { where: cond }).then((mapping) => {
              var filedirectory =
                __dirname +
                "/../TranslatedBooks/" +
                bookId +
                "_" +
                langId +
                ".txt";

              fs.writeFile(
                filedirectory,
                updateBook.file,
                function (err, data) {
                  if (!err) {
                    req.session.user = usersession;
                    res.send("Your document has been saved.");
                  } else {
                    res.status(500).send("Error in saving document.");
                  }
                }
              );
            });
          } else {
            res.status(500).send("Error in saving Book");
          }
        });
      });
  } else {
    res.status(403).send({
      code: 403,
      status: "FAILURE",
      message: "Authentication Error",
    });
  }
};

exports.read = (req, res) => {
  const usersession = req.session.user;
  if (req.session.user && req.cookies.user_sid) {
    user
      .findOne({ where: { email: { [Op.eq]: `${usersession}` } } })
      .then(function (data) {
        userId = data.dataValues.id;
        const usersession = req.session.user;
        const langId = req.query.langId;
        const bookId = req.query.bookId;
        const status = req.query.status;
        const cond = {
          langId: { [Op.eq]: `${langId}` },
          bookId: { [Op.eq]: `${bookId}` },
        };

        mappings.findOne({ where: cond }).then(function (data) {
          if (data.dataValues) {
            var filedirectory =
              __dirname +
              "/../TranslatedBooks/" +
              bookId +
              "_" +
              langId +
              ".txt";
            fs.readFile(filedirectory, "utf8", function (err, data) {
              if (!err) {
                req.session.user = usersession;
                res.send(data);
              } else {
                console.log("File Read" + err);
                req.session.user = usersession;
                res.status(500).send("Error while reading document.");
              }
            });
          }
        });
      });
  } else {
    res.status(403).send({
      code: 403,
      status: "FAILURE",
      message: "Authentication Error",
    });
  }
};

exports.findBooksByStatus = (req, res) => {
  const usersession = req.session.user;
  var queryStatus = req.query.status;
  var statusArr = [];

  if (queryStatus.indexOf(",") > -1) statusArr = queryStatus.split(",");
  else statusArr.push(queryStatus);

  // if (true) {
  if (req.session.user && req.cookies.user_sid) {
    var userId = 0;
    var cond = "";
    user
      .findOne({
        where: { email: { [Op.eq]: `${usersession}` } },
        include: [
          {
            model: userType,
            as: "userType",
            attributes: ["id", "type"],
          },
        ],
      })
      .then(function (user) {
        userId = user.dataValues.id;
        type = user.dataValues.userType.dataValues.type;
        userTypeId = user.dataValues.userType.dataValues.id;
        if (type == enums.TRL) {
          cond = {
            status: { [Op.eq]: enums.TIP },
            createdBy: { [Op.eq]: `${userId}` },
          };
        } else if (type == enums.RVW) {
          cond = {
            status: statusArr,
            createdBy: { [Op.eq]: `${userId}` },
          };
        } else if (type == enums.PBL) {
          cond = {
            status: { [Op.eq]: `PIP` },
            createdBy: { [Op.eq]: `${userId}` },
          };
        }
        req.session.user = usersession;
        mappings
          .findAll({
            where: cond,
            include: [
              {
                model: book,
                as: "book",
                attributes: [
                  "id",
                  "title",
                  "language",
                  "pages",
                  "path",
                  "genre",
                  "lfaId",
                  "metaDesc",
                  "keywords",
                ],
              },
              { model: language, as: "language", attributes: ["id", "value"] },
            ],
          })
          .then(function (data) {
            if (data.length > 0) {
              var bookInfo = [];
              for (var i = 0; i < data.length; i++) {
                var translatingIn = {
                  value: data[i].dataValues.language.dataValues.value,
                  id: data[i].dataValues.language.dataValues.id,
                };

                bookInfo.push({
                  docId: data[i].dataValues.book.dataValues.id,
                  bookTitle: data[i].dataValues.book.dataValues.title,
                  originalLanguage: data[i].dataValues.book.dataValues.language,
                  translationIn: translatingIn,
                  approxLength: data[i].dataValues.book.dataValues.pages,
                  docUrl: data[i].dataValues.book.dataValues.path,
                  category: data[i].dataValues.book.dataValues.genre,
                  category: data[i].dataValues.book.dataValues.genre,
                  lfaId: data[i].dataValues.book.dataValues.lfaId,
                  metaDesc: data[i].dataValues.book.dataValues.metaDesc,
                  keywords: data[i].dataValues.book.dataValues.keywords,
                  status: data[i].dataValues.status,
                });
              }

              res.send(bookInfo);
            } else {
              res.status(400).send({
                code: 200,
                status: "FAILURE",
                message: "No data found",
              });
            }
          });
      });
  } else {
    res.status(403).send({
      code: 403,
      status: "FAILURE",
      message: "Authentication Error",
    });
  }
};

exports.publish = (req, res) => {
  const usersession = req.session.user;
  // const usersession = "translator@gmail.com";

  if (req.session.user && req.cookies.user_sid) {
    // if (true) {
    user
      .findOne({ where: { email: { [Op.eq]: `${usersession}` } } })
      .then(function (data) {
        userId = data.dataValues.id;
        const langId = req.body.langId;
        const bookId = req.body.bookId;
        const fileContent = req.body.content;
        //  const status = enums.AVL;
        // const cond = { email: { [Op.eq]: `${email}` } };

        const cond = {
          langId: { [Op.eq]: `${langId}` },
          bookId: { [Op.eq]: `${bookId}` },
          // status: { [Op.eq]: `${status}` },
        };

        mappings.findOne({ where: cond }).then(function (bookDetails) {
          var updatedStatus = "";
          var history = {
            langId: langId,
            bookId: bookId,
            status: null,
            user: null,
            updatedstatus: null,
          };
          if (bookDetails.dataValues) {
            currentStatus = bookDetails.dataValues.status;
            if (currentStatus == enums.TIP || currentStatus == enums.AVL) {
              updatedStatus = enums.TCT;
              history.userStatus = enums.TCT;
              history.user = userId;
              history.updatedstatus = enums.TCT;

              bookHistory
                .create(history)
                .then((data) => {
                  console.log("History Maintained for user" + userId);
                })
                .catch((err) => {
                  console.log(
                    "Error Occurred in maintaining history for user " + userId
                  );
                  res.status(500).send("500 Internal Server Error");
                  req.session.user = usersession;
                });
            } else if (
              currentStatus == enums.IR ||
              currentStatus == enums.TCT
            ) {
              updatedStatus = enums.RCT;
              history.userStatus = enums.RCT;
              history.user = userId;
              history.updatedstatus = enums.RCT;

              bookHistory.create(history).then((data) => {
                console.log("History Maintained for user" + userId);

                bookHistory
                  .update(
                    { updatedstatus: enums.RCT },
                    {
                      where: {
                        bookId: { [Op.eq]: `${bookId}` },
                        langId: { [Op.eq]: `${langId}` },
                        updatedstatus: { [Op.not]: enums.REJ },
                      },
                    }
                  )
                  .then((value) => {
                    if ((value = 1)) console.log("New status has been added");
                    else {
                      console.log("Could not added new status");
                      req.session.user = usersession;
                      res.status(500).send("Error ! Error ! Error !");
                    }
                  });
              });
            } else if (
              currentStatus == enums.RCT ||
              currentStatus == enums.PIP
            ) {
              updatedStatus = enums.PCT;
              history.userStatus = enums.PCT;
              history.user = userId;
              history.updatedstatus = enums.PCT;

              bookHistory.create(history).then((data) => {
                console.log("History Maintained for user" + userId);

                bookHistory
                  .update(
                    { updatedstatus: enums.PCT },
                    {
                      where: {
                        bookId: {
                          [Op.eq]: `${bookId}`,
                        },
                        langId: { [Op.eq]: `${langId}` },
                        updatedstatus: { [Op.not]: enums.REJ },
                      },
                    }
                  )
                  .then((value) => {
                    if ((value = 1)) {
                      console.log("New status has been added");

                      bookHistory
                        .findAll({
                          where: {
                            bookId: {
                              [Op.eq]: `${bookId}`,
                            },
                            langId: { [Op.eq]: `${langId}` },
                          },
                        })
                        .then(function (hist) {
                          var idArray = [];
                          if (hist.length > 0) {
                            var cond = {};

                            for (var i = 0; i < hist.length; i++) {
                              idArray.push(hist[i].user);
                              console.log("values in loop " + hist[i].user);
                            }
                            cond = { id: idArray };

                            user
                              .increment({ awardPoints: 10 }, { where: cond })
                              .then((num) => {
                                if (num)
                                  console.log(
                                    "Award points updated Successfully."
                                  );
                                else {
                                  console.log("Could not update award points.");
                                  res.status(500).send("Internal Server Error");
                                }
                              });
                          } else console.log("No History Found");
                        });
                    } else {
                      console.log("Could not added new status");
                      req.session.user = usersession;
                      res.status(500).send("Error ! Error ! Error !");
                    }
                  });
              });
            } else {
              req.session.user = usersession;
              res.status(500).send("Error occurred in fetching existing data.");
            }
            var updateBook = {
              status: updatedStatus,
              createdBy: userId,
              upatedDate: new Date(),
              file: fileContent,
            };
            mappings.update(updateBook, { where: cond }).then((mapping) => {
              var filedirectory =
                __dirname +
                "/../TranslatedBooks/" +
                bookId +
                "_" +
                langId +
                ".txt";

              fs.writeFile(
                filedirectory,
                updateBook.file,
                function (err, data) {
                  if (!err) {
                    req.session.user = usersession;
                    res.send("Your work has been completed.");
                  } else {
                    req.session.user = usersession;
                    res.status(500).send("Error in document.");
                  }
                }
              );
            });
          } else {
            req.session.user = usersession;
            res.status(400).send({
              code: 400,
              status: "FAILURE",
              message: "No data found !!",
            });
          }
        });
      });
  } else {
    req.session.user = usersession;
    res.status(403).send({
      code: 403,
      status: "FAILURE",
      message: "Authentication Error",
    });
  }
};

exports.discard = (req, res) => {
  const usersession = req.session.user;
  // const usersession = "reviewer@gmail.com";

  if (req.session.user && req.cookies.user_sid) {
    // if (true) {
    user
      .findOne({ where: { email: { [Op.eq]: `${usersession}` } } })
      .then(function (data) {
        userId = data.dataValues.id;

        const cond = {
          langId: { [Op.eq]: req.body.langId },
          bookId: { [Op.eq]: req.body.bookId },
        };

        mappings.findOne({ where: cond }).then(function (bookDetails) {
          var updateBook = {};
          if (bookDetails.dataValues) {
            currentStatus = bookDetails.dataValues.status;
            if (currentStatus == enums.TIP) {
              updateBook = {
                status: enums.AVL,
                createdBy: null,
                upatedAt: new Date(),
                file: "",
              };
            } else if (currentStatus == enums.IR) {
              updateBook = {
                status: enums.TCT,
                createdBy: null,
                upatedDate: new Date(),
              };
            } else if (currentStatus == enums.PIP) {
              updateBook = {
                status: enums.RCT,
                createdBy: null,
                upatedDate: new Date(),
              };
            } else {
              res.status(500).send("Error in fetching Data");
            }

            mappings.update(updateBook, { where: cond }).then((mapping) => {
              if (updateBook.status == enums.AVL) {
                var filedirectory =
                  __dirname +
                  "/../TranslatedBooks/" +
                  req.body.bookId +
                  "_" +
                  req.body.langId +
                  ".txt";

                fs.writeFile(
                  filedirectory,
                  updateBook.file,
                  function (err, data) {
                    if (!err) {
                      req.session.user = usersession;
                      res.send("Translation has been discarded");
                    } else {
                      res.status(500).send("Error in document.");
                    }
                  }
                );
              } else if (updateBook.status == enums.TCT) {
                req.session.user = usersession;
                res.status(200).send({
                  message: "Review has been discarded",
                });
              }
            });
          } else {
            res.status(400).send({
              code: 400,
              status: "FAILURE",
              message: "No data found !!",
            });
          }
        });
      });
  } else {
    res.status(403).send({
      code: 403,
      status: "FAILURE",
      message: "Authentication Error",
    });
  }
};

exports.reject = (req, res) => {
  const usersession = req.session.user;
  const bookId = req.body.bookId;
  const langId = req.body.langId;

  if (req.session.user && req.cookies.user_sid) {
    // if (true) {
    user
      .findOne({
        where: { email: { [Op.eq]: `${usersession}` } },
        include: [
          {
            model: userType,
            as: "userType",
            attributes: ["id", "type"],
          },
        ],
      })
      .then(function (data) {
        var userId = data.dataValues.id;

        var cond = {
          langId: { [Op.eq]: req.body.langId },
          bookId: { [Op.eq]: req.body.bookId },
          // userId: { [Op.eq]: user }
        };
        var bookCond = {
          langId: { [Op.eq]: req.body.langId },
          bookId: { [Op.eq]: req.body.bookId },
          updatedstatus: { [Op.not]: enums.REJ },
          // userId: { [Op.eq]: user }
        };
        mappings.findOne({ where: cond }).then((mapping) => {
          if (mapping.dataValues) {
            var testhistory = {};
            if (data.dataValues.userType.dataValues.type == enums.PUB) {
              testhistory = {
                langId: langId,
                bookId: bookId,
                userStatus: enums.PCT,
                user: userId,
                updatedstatus: enums.REJ,
              };
            } else if (data.dataValues.userType.dataValues.type == enums.RVW) {
              testhistory = {
                langId: langId,
                bookId: bookId,
                userStatus: enums.RCT,
                user: userId,
                updatedstatus: enums.REJ,
              };
            }
            if (mapping.dataValues.status != enums.AVL) {
              var updateBook = {
                status: enums.AVL,
                createdBy: null,
                file: null,
              };
              mappings.update(updateBook, { where: cond }).then((num) => {
                var filedirectory =
                  __dirname +
                  "/../TranslatedBooks/" +
                  req.body.bookId +
                  "_" +
                  req.body.langId +
                  ".txt";

                // delete file
                fs.unlink(filedirectory, function (err) {
                  if (err) throw err;
                  // if no error, file has been deleted successfully
                  console.log("File deleted!");
                });
                var updateHist = {
                  updatedstatus: enums.REJ,
                };

                if (num == 1) {
                  bookHistory
                    .update(updateHist, { where: bookCond })
                    .then((hist) => {
                      if (hist) {
                        bookHistory
                          .create(testhistory)
                          .then((data) => {
                            req.session.user = usersession;
                            res.send("Rejected");
                          })
                          .catch((err) => {
                            console.log(
                              "Error Occurred in maintaining history for user " +
                                userId
                            );
                            req.session.user = usersession;
                            res.status(500).send("500 Internal Server Error");
                          });
                      } else {
                        console.log(
                          "Error in updating Book transalation record."
                        );
                        req.session.user = usersession;
                        res.status(500).send("500 Internal Server Error");
                      }
                    });
                }
              });
            }
          } else {
            console.log("No mapping found for this record.");
            req.session.user = usersession;
            res.status(400).send("No data found.");
          }
        });
      });
  }
};
