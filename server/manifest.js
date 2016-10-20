var config = require('../config')

const manifest = {
  server: {
  },
  connections: [
    {
      port: process.env.PORT || config.server.port,
      host: config.server.host
    }
  ],
  registrations: [
    {
      plugin: {
        register: 'hapi-node-postgres',
        options: {
          connectionString: config.database.connectionString
        }
      }
    },
    {
      plugin: {
        register: 'good',
        options: config.logging
      }
    },
    {
      plugin: {
        register: 'node-hapi-airbrake',
        options: config.errbit
      }
    }
  ]
}

module.exports = manifest
