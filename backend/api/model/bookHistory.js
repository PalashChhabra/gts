const db = require("./");
const language = db.language;
const book = db.book;
const status = db.status;
const user = db.user;


module.exports = (sequelize, Sequelize) => {
  const bookHistory = sequelize.define(
    "bookHistory",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // langId:
      // {
      //   type: Sequelize.INTEGER,
      //   notNull: true,
      //   references: {
      //     model: 'language', // 'language' refers to table name
      //     key: 'id', // 'id' refers to column name in language table
      //   }

      // },
      // bookId: {
      //   type: Sequelize.INTEGER,
      //   notNull: true,
      //   references: {
      //     model: 'book', // 'book' refers to table name
      //     key: 'id', // 'id' refers to column name in book table
      //   }
      // },
      userStatus: {
        type: Sequelize.STRING,
        notNull: true,
        references: {
          model: 'status', // 'status' refers to table name
          key: 'code', // 'code' refers to column name in status table
        }
      },
      user:
      {
        type: Sequelize.INTEGER,
        notNull: true,
        references: {
          model: 'user', // 'user' refers to table name
          key: 'id', // 'code' refers to column name in status table
        }
      }
      // updatedstatus:
      // {
      //   type: Sequelize.STRING,
      //   notNull: true
      // }
    },
    {
      freezeTableName: true,
    }
  );
  bookHistory.belongsTo(sequelize.models.book, { foreignKey: 'bookId', as: 'book' });
  bookHistory.belongsTo(sequelize.models.language, { foreignKey: 'langId', as: 'language' });
  bookHistory.belongsTo(sequelize.models.status, { foreignKey: 'updatedstatus', as: 'newstatus', key: 'code' });


  return bookHistory;
};
