'use strict'
const Joi = require('joi')
const schema = require('./schema')
const config = require('./server.json')

const result = Joi.validate(config, schema)

if (result.error) {
  throw new Error('The server config is invalid. ' + result.error.message)
}

module.exports = result.value
