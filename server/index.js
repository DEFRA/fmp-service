'use strict'
const Glue = require('glue')
const routes = require('./routes')
const manifest = require('./manifest')
const appName = require('../package.json').name
const options = {
  relativeTo: __dirname
}

module.exports = async () => {
  try {
    const server = await Glue.compose(manifest, options)

    server.route(routes)

    server.ext('onPreResponse', function (request, h) {
      const response = request.response

      if (response.isBoom) {
        // An error was raised during
        // processing the request
        var statusCode = response.output.statusCode

        request.log('error', {
          statusCode: statusCode,
          data: response.data,
          message: response.message
        })
      }
      return h.continue
    })

    await server.start()
    console.log('Started ' + appName)
  } catch (err) {
    throw err
  }
}
