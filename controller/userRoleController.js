const BaseController = require("./Controller");
const { Role, User } = require('../models');

class Controller extends BaseController{
  constructor() {
    super({
      tableName: 'UserRole',
      include: []
    }); 
  }

}

module.exports = Controller;