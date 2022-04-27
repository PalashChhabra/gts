module.exports = (sequelize, Sequelize) => {
  const book = sequelize.define("book", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      uniqueKey: true
    },
    lfaId:
    {
      type: Sequelize.INTEGER,
      uniqueKey: true
    },
    language: {
      type: Sequelize.STRING
    },
    pages:
    {
      type: Sequelize.INTEGER
    },
    format:
    {
     type:Sequelize.STRING
    },
    path:
    {
      type:Sequelize.STRING
    },    
    author:
    {
      type:Sequelize.STRING
    },
    genre:
    {
      type:Sequelize.STRING
    },
    metaDesc:
    {
      type:Sequelize.STRING
    },
    keywords:
    {
      type:Sequelize.STRING
    }
    },
    {
      freezeTableName: true,

    });

  return book;
};