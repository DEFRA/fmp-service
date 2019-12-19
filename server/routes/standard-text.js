const Joi = require('joi')
const Boom = require('boom')
const standardTextData = require('../../data/standard-text.json')

module.exports = {
  method: 'GET',
  path: '/standard-text',
  options: {
    description: 'Returns all standard-text',
    handler: async (request, h) => {
      try {
        return standardTextData
      } catch (err) {
        return Boom.badImplementation('standard-text failed', err)
      }
    }
  }
}
