const Sequelize = require("sequelize");
const sequelize = new Sequelize("gts", "root", "test@123", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userType = require("./usertype.js")(sequelize, Sequelize);
db.book = require("./book.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.status = require("./status.js")(sequelize, Sequelize);
db.language = require("./language.js")(sequelize, Sequelize);
db.mapping = require("./mappingBookTrans.js")(sequelize, Sequelize);
db.bookHistory = require("./bookHistory.js")(sequelize, Sequelize);

module.exports = db;
