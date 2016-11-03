var Joi = require('joi')

var serverSchema = Joi.object().required().keys({
  host: Joi.string().hostname(),
  port: Joi.number().required(),
  labels: Joi.string()
})

var databaseSchema = Joi.object().required().keys({
  connectionString: Joi.string().required()
})

module.exports = {
  server: serverSchema,
  logging: Joi.object(),
  database: databaseSchema,
  errbit: Joi.object().required().keys({
    postErrors: Joi.boolean().required(),
    env: Joi.string().required(),
    key: Joi.string().required(),
    host: Joi.string().required(),
    proxy: Joi.string().allow('')
  })
}
