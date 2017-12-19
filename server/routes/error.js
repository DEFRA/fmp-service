'use strict'

const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/error',
  config: {
    description: 'Path to test error handling',
    handler: async (request, h) => {
      return Boom.badImplementation('/error test path', new Error())
    }
  }
}
