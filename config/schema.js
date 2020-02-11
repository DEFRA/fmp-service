const Joi = require('joi')

const serverSchema = Joi.object().required().keys({
  host: Joi.string().hostname(),
  port: Joi.number().required(),
  labels: Joi.string()
})

const databaseSchema = Joi.object().required().keys({
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
  }),
  printServiceSubmitJobBaseURL: Joi.string().required(),
  printServiceJobStatusAndMapsURL: Joi.string().required()
}
