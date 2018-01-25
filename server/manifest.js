const config = require('../config')

const manifest = {
  server: {
    port: config.server.port,
    host: config.server.host
  },
  register: {
    plugins: [
      {
        plugin: 'good',
        options: config.logging
      },
      './plugins/log-errors',
      './plugins/router'
    ]
  }
}

if (config.errbit.postErrors) {
  delete config.errbit.postErrors
  manifest.register.plugins.push({
    plugin: 'node-hapi-airbrake',
    options: config.errbit
  })
}

module.exports = manifest
