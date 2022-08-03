const i18n = require("i18n-express");
const path = require('path')

const options = {
  translationsPath: path.join(__dirname, '../../', 'locale'), // <--- use here. Specify translations files path.
  siteLangs: ["en","it"],
  defaultLang: 'it',
  textsVarName: 'i18n',
  paramLangName:'locale'
}
module.exports = () => i18n(options) 

