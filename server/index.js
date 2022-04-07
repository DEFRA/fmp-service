const hapi = require('@hapi/hapi')
const config = require('../config')

async function createServer () {
  const server = hapi.server({
    port: config.server.port,
    host: config.server.host,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })

  await server.register(require('./plugins/log-errors'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/logging'))

  if (config.errbit.postErrors) {
    delete config.errbit.postErrors
    await server.register({
      plugin: require('node-hapi-airbrake'),
      options: config.errbit
    })
  }

  return server
}

module.exports = createServer
