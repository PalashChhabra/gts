const db = require("../model");
const books = db.book;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!"
    });
    return;
  }

  //  Add book details
  const document = {
    name: req.body.name,
    language: req.body.language,
    pages: req.body.noOfPages,
    format: req.body.fileType,
    author: req.body.author,
    genre: req.body.genre,
    path: "/books/" + req.body.name + ""
  };


  books.create(document)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the book to the database."
      });
    });
};


// exports.findBooks = (req, res) => {
//  // const Key = req.query.key;
//   //const Value = req.query.Value;
//     const query = req.query;

//     userDetails.findOne({ where: cond }).then(function (user) {

//   var condition = {
//     {title ? { title: { [Op.like]: `%${title}%` } } : null;},
//     {author ? { author: { [Op.like]: `%${author}%` } } : null;},
//     {genre ? { name: { [Op.like]: `%${name}%` } } : null;},
//     };


//   documentDB.findAll()
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving documents."
//       });
//     });
// };
