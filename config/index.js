var Joi = require('joi')
var schema = require('./schema')
var config = require('./server.json')

if (config.envVars != null) {
  var envVars = config.envVars
  for (var key in envVars) {
    envVars[key] = process.env[key.toUpperCase()]
  }
}

Joi.validate(config, schema, function (err, value) {
  if (err) {
    throw new Error('The server config is invalid. ' + err.message)
  }
  // Update config with validated object
  config = value
})

module.exports = config
