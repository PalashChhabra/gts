module.exports = (sequelize, Sequelize) => {
  const status = sequelize.define("status", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      unique: true
    },
    code: {
      type: Sequelize.STRING,
      primaryKey: true
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

  return status;
};