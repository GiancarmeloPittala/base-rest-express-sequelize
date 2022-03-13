'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js');
const db = {};

const Op = Sequelize.Op;
const operatorsAliases = {
  $and:Op.and,
  $or:Op.or,
  $gt:Op.gt,
  $gte:Op.gte,
  $lt:Op.lt,
  $lte:Op.lte,
  $ne:Op.ne,
  $eq:Op.eq,
  $not:Op.not,
  $between:Op.between,
  $notBetween:Op.notBetween,
  $in:Op.in,
  $notIn:Op.notIn,
  $like:Op.like,
  $notLike:Op.notLike,
  $iLike:Op.iLike,
  $notILike:Op.notILike,
  $regexp:Op.regexp,
  $notRegexp:Op.notRegexp,
  $iRegexp:Op.iRegexp,
  $notIRegexp:Op.notIRegexp,
  $like:Op.like,
  $overlap:Op.overlap,
  $contains:Op.contains,
  $contained:Op.contained,
  $any:Op.any,
  $col:Op.col,
  $contains:Op.contains,
  $contains:Op.contains,
  $contained:Op.contained,
  $overlap:Op.overlap,
  $adjacent:Op.adjacent,
  $strictLeft:Op.strictLeft,
  $strictRight:Op.strictRight,
  $noExtendRight:Op.noExtendRight,
  $noExtendLeft:Op.noExtendLeft
}


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, 
    { ...config, operatorsAliases });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
