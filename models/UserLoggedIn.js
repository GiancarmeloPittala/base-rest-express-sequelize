'use strict';
const { STRING } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLoggedIn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({ User }) {
      this.belongsTo(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  UserLoggedIn.init({
    token:{
      type: DataTypes.STRING(300),
      allowNull: false
    },
    info: {
      type: DataTypes.TEXT('medium')
    }
  }, {
    sequelize,
    modelName: 'UserLoggedIn',
    tableName: 'UserLoggedIns',
    updatedAt: false
  });
  return UserLoggedIn;
};