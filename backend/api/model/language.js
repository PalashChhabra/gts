module.exports = (sequelize, Sequelize) => {
  const language = sequelize.define("language", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: Sequelize.STRING,
      unique: true

    },
    value:
    {
      type: Sequelize.STRING,
      unique: true
    }
  },
    {
      freezeTableName: true,

    });

  return language;
};