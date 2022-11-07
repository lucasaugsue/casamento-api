const jwt = require('koa-jwt')
const token = require('../config/jwt')
module.exports = function (params) {
  let response = jwt.sign(params, token.key)
  return response
}