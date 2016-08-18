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
          connectionString: config.envVars.fmp_db_conn
        }
      }
    },
    {
      plugin: {
        register: 'good',
        options: config.logging
      }
    }
  ]
}

module.exports = manifest
