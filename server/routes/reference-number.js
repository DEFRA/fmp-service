const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/reference-number',
  options: {
    description: 'Returns application reference number',
    handler: async (request, h) => {
      try {
        const applicationReferenceNumber = generate()
        return Object.freeze(applicationReferenceNumber)
      } catch (err) {
        return Boom.badImplementation('Reference Number Generation failed', err)
      }
    }
  }
}

function generate () {
  const generate = require('nanoid/generate')
  const alphabet = '123456789ABCDEFGHJKMNPRTUVWXY'
  return generate(alphabet, 12)
}
