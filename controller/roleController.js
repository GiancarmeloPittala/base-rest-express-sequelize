const BaseController = require("./Controller");
const { Role } = require('../models');

class Controller extends BaseController{
  constructor() {
    super({
      tableName: 'Role',
      include: []
    }); 
  }

}

module.exports = Controller;