const Boom = require('boom')
const AppRefNumberGenerator = require('../util/refnumber')

module.exports = {
  method: 'GET',
  path: '/reference-number',
  options: {
    description: 'Returns application reference number',
    handler: async (request, h) => {
      try {
        const applicationReferenceNumber = AppRefNumberGenerator()
        return Object.freeze(applicationReferenceNumber)
      } catch (err) {
        return Boom.badImplementation('Reference Number Generation failed', err)
      }
    }
  }
}
