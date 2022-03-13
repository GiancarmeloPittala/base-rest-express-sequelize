'use strict';
const { STRING } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({Role, User}) {
      this.belongsTo(Role, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      this.belongsTo(User, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  UserRole.init({
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'UserRoles',
    timestamps: false
  });
  return UserRole;
};