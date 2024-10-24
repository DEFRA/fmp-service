const Joi = require('joi')

const serverSchema = Joi.object().required().keys({
  host: Joi.string().hostname(),
  port: Joi.number().required(),
  labels: Joi.string()
})

const databaseSchema = Joi.object().required().keys({
  connectionString: Joi.string().required()
})

const schema = Joi.object().required().keys({
  env: Joi.string().default('dev').valid('dev', 'test', 'prod-green', 'prod-blue'),
  server: serverSchema,
  logging: Joi.object(),
  database: databaseSchema,
  errbit: Joi.object().required().keys({
    postErrors: Joi.boolean().required(),
    env: Joi.string().required(),
    key: Joi.string().required(),
    host: Joi.string().required()
  })
})

const config = {
  env: process.env.NODE_ENV,
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
    labels: process.env.LABELS
  },
  database: {
    connectionString: process.env.CONNECTIONSTRING
  },
  logging: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [
            {
              log: '*',
              response: '*',
              error: '*',
              request: 'error'
            }
          ]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  },
  errbit: {
    postErrors: process.env.ERRBIT_POST_ERRORS,
    env: process.env.NODE_ENV,
    key: process.env.ERRBIT_KEY,
    host: process.env.ERRBIT_HOST
  }
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === 'dev'
value.isTest = value.env === 'test'
value.isProd = value.env.startsWith('prod-')

console.log('Service runnning on port', value.server.port)

module.exports = value
