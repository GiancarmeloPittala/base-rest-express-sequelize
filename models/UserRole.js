'use strict';
const { STRING } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {

    static associate({Role, User}) {
      this.belongsTo(Role, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      this.belongsTo(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
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