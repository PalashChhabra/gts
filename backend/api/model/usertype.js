module.exports = (sequelize, Sequelize) => {
  const userType = sequelize.define(
    "userType",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
      },
      points: {
        type: Sequelize.INTEGER
      }
    },
    {
      freezeTableName: true,
    }
  );

  return userType;
};
