const db = require("../model");
var enums = require("../model/enums.js");
const userData = db.user;
const userType = db.userType;
const book = db.book;
const language = db.language;
const bookHistory = db.bookHistory;
const Op = db.Sequelize.Op;
const status = db.status;
var enums = enums;

exports.getHistory = (req, res) => {
  var userSession = req.session.user;
  // var userSession = "reviewer@gmail.com";
  var translationHist = [];
  var reviewHist = [];
  var history = [];
  var publishingHist = [];
  if (req.session.user && req.cookies.user_sid) {
    // if (true) {

    userData
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
        var cond = {
          user: userData.dataValues.id,
        };

        //uid: userData.dataValues.id;
        user_type = userData.dataValues.userType.dataValues.type;
        bookHistory
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
              { model: status, as: "newstatus", attributes: ["id", "value"] },
            ],
          })
          .then(function (data) {
            if (data.length > 0) {
              if (user_type == enums.TRL) {
                for (var i = 0; i < data.length; i++) {
                  translationHist.push({
                    docId: data[i].dataValues.book.dataValues.id,
                    bookTitle: data[i].dataValues.book.dataValues.title,
                    originalLanguage:
                      data[i].dataValues.book.dataValues.language,
                    translatedIn: data[i].dataValues.language.dataValues.value,
                    approxLength: data[i].dataValues.book.dataValues.pages,
                    docUrl: data[i].dataValues.book.dataValues.path,
                    category: data[i].dataValues.book.dataValues.genre,
                    lfaId: data[i].dataValues.book.dataValues.lfaId,
                    metaDesc: data[i].dataValues.book.dataValues.metaDesc,
                    keywords: data[i].dataValues.book.dataValues.keywords,
                    updatedstatus:
                      data[i].dataValues.newstatus.dataValues.value,
                  });
                }
                history.push({
                  translationHistory: translationHist,
                });
                req.session.user = userSession;
                res.send(history);
              } else if (user_type == enums.RVW) {
                for (var i = 0; i < data.length; i++) {
                  if (data[i].dataValues.userStatus == enums.TCT) {
                    translationHist.push({
                      docId: data[i].dataValues.book.dataValues.id,
                      bookTitle: data[i].dataValues.book.dataValues.title,
                      originalLanguage:
                        data[i].dataValues.book.dataValues.language,
                      translatedIn:
                        data[i].dataValues.language.dataValues.value,
                      approxLength: data[i].dataValues.book.dataValues.pages,
                      docUrl: data[i].dataValues.book.dataValues.path,
                      category: data[i].dataValues.book.dataValues.genre,
                      lfaId: data[i].dataValues.book.dataValues.lfaId,
                      metaDesc: data[i].dataValues.book.dataValues.metaDesc,
                      keywords: data[i].dataValues.book.dataValues.keywords,
                      updatedstatus:
                        data[i].dataValues.newstatus.dataValues.value,
                    });
                  } else if (data[i].dataValues.userStatus == enums.RCT) {
                    reviewHist.push({
                      docId: data[i].dataValues.book.dataValues.id,
                      bookTitle: data[i].dataValues.book.dataValues.title,
                      originalLanguage:
                        data[i].dataValues.book.dataValues.language,
                      translatedIn:
                        data[i].dataValues.language.dataValues.value,
                      approxLength: data[i].dataValues.book.dataValues.pages,
                      docUrl: data[i].dataValues.book.dataValues.path,
                      category: data[i].dataValues.book.dataValues.genre,
                      lfaId: data[i].dataValues.book.dataValues.lfaId,
                      metaDesc: data[i].dataValues.book.dataValues.metaDesc,
                      keywords: data[i].dataValues.book.dataValues.keywords,
                      updatedstatus:
                        data[i].dataValues.newstatus.dataValues.value,
                    });
                  }
                }
                history.push({
                  translationHistory: translationHist,
                });
                history.push({
                  reviewHistory: reviewHist,
                });
                req.session.user = userSession;
                res.send(history);
              } else if (user_type == enums.PBL) {
                for (var i = 0; i < data.length; i++) {
                  if (data[i].dataValues.userStatus == enums.PCT) {
                    publishingHist.push({
                      docId: data[i].dataValues.book.dataValues.id,
                      bookTitle: data[i].dataValues.book.dataValues.title,
                      originalLanguage:
                        data[i].dataValues.book.dataValues.language,
                      translatedIn:
                        data[i].dataValues.language.dataValues.value,
                      approxLength: data[i].dataValues.book.dataValues.pages,
                      docUrl: data[i].dataValues.book.dataValues.path,
                      category: data[i].dataValues.book.dataValues.genre,
                      lfaId: data[i].dataValues.book.dataValues.lfaId,
                      metaDesc: data[i].dataValues.book.dataValues.metaDesc,
                      keywords: data[i].dataValues.book.dataValues.keywords,
                      updatedstatus:
                        data[i].dataValues.newstatus.dataValues.value,
                    });
                  }
                }
                history.push({
                  publishingHistory: publishingHist,
                });
                req.session.user = userSession;
                res.send(history);
              } else {
                console.log("No data found for this user");
                req.session.user = userSession;
                res.status(400).send("No data found for this user");
              }
            }
          });
      });
  } else {
    res.status(403).send({
      code: 403,
      status: "FAILURE",
      message: "Authetication Error",
    });
  }
};
