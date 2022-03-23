'use strict';
const { STRING } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toJSON(){
      return { ...this.get(), password: undefined }
    }

    static associate({UserRole, Role, UserLoggedIn}) {
      this.belongsToMany(Role, { through: UserRole, onDelete: 'CASCADE' }) // for 2 primary keys
      this.hasMany(UserRole, { onDelete: 'CASCADE', onUpdate: 'CASCADE'}) // for native sequelize functions
      this.hasMany(UserLoggedIn, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  User.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },  
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      unique: 'User_email',
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    isConfirmed:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};