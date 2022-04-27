const db = require("./");
const userType = db.userType;
var bcrypt = require('bcryptjs');


module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      notNull: true,
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    },
    location: {
      type: Sequelize.STRING
    },
    language:
    {
      type: Sequelize.STRING
    },
    email:
    {
      type: Sequelize.STRING,
      notNull: true,
      unique: true
    },
    password:
    {
      notNull: true,
      type: Sequelize.STRING
    },
    awardPoints:
    {
      notNull: true,
      type: Sequelize.INTEGER
    }

    // userTypeId:
    // {
    //   type: Sequelize.INTEGER,
    //   notNull: true,
    //   references: {
    //     model: 'userType', // 'userType' refers to table name
    //     key: 'id', // 'id' refers to column name in userType table
    //   }

    // }
  },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      instanceMethods: {
        validPassword: function (password) {
          return bcrypt.compareSync(password, this.password);
        }
      }
    });

  user.belongsTo(sequelize.models.userType, { foreignKey: 'userTypeId', as: 'userType' });


  return user;
};