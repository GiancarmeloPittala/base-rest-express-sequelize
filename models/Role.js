'use strict';
const { STRING } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     static associate({UserRole, Role}) {
      this.hasMany(UserRole,{onDelete: 'CASCADE', onUpdate: 'CASCADE'}) // for native sequelize functions
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: 'role_name'
    },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Roles'
  });
  return Role;
};