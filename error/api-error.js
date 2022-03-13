class Apierror{
  constructor( code, message){
    this.message = message;
    this.code = code;
    return this;
  }
  static badFields(msg){
    return new Apierror( 200, msg);
  }
  static badRequest(msg){
    return new Apierror( 400, msg);
  }
  static Unauthorized(msg = "Non possiedi i permessi "){
    return new Apierror( 401, msg);
  }

}

module.exports = Apierror;