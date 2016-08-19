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
    },
    {
      plugin: {
        register: 'node-hapi-airbrake',
        options: {
          key: config.envVars.fmp_service_errbit_key,
          env: 'production',
          host: config.envVars.fmp_service_errbit_host
        }
      }
    }
  ]
}

module.exports = manifest
