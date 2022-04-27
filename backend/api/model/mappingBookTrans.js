const db = require("./");
const user = db.user;
const book = db.book;
const language = db.language;
const status = db.status;


module.exports = (sequelize, Sequelize) => {
  console.log("book is " + book);
  const mapping = sequelize.define("mappingBookTrans", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // bookId: {
    //   type: Sequelize.INTEGER,
    //   notNull: true,
    //   references: {
    //     model: 'book', // 'book' refers to table name
    //     key: 'id', // 'id' refers to column name in book table
    //   }
    // },
    // langId: {
    //   type: Sequelize.INTEGER,
    //   notNull: true,
    //   references: {
    //     model: 'language', // 'language' refers to table name
    //     key: 'id', // 'id' refers to column name in language table
    //   }
    // },
    status: {
      type: Sequelize.STRING,
      notNull: true,
      references: {
        model: 'status', // 'status' refers to table name
        key: 'code', // 'code' refers to column name in status table
      }
    },
    file: {
      type: Sequelize.BLOB
    },
    createdBy: {
      type: Sequelize.INTEGER,
      notNull: true,
      references: {
        model: 'user', // 'user' refers to table name
        key: 'id', // 'id' refers to column name in user table
      }
    }
  },
    {
      freezeTableName: true,

    });
  // mapping.belongsTo(book,{foreignKey:'bookId'}); 
  //UserPermission.hasMany(PermissionItem, { foreignKey: 'permissionItemId', sourceKey: 'permissionItemId' });
  //sequelize.models.book.belongsToMany(sequelize.models.language, { through: 'mappingBookTrans' , foreignKey : 'bookId', as: 'book'});
  //sequelize.models.language.belongsToMany(sequelize.models.book, { through: 'mappingBookTrans' ,foreignKey : 'languageId', as: 'language'});

  mapping.belongsTo(sequelize.models.book, { foreignKey: 'bookId', as: 'book' });
  mapping.belongsTo(sequelize.models.language, { foreignKey: 'langId', as: 'language' });
  return mapping;
};