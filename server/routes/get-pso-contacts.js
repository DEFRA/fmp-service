const Joi = require('joi')
const Boom = require('@hapi/boom')
const services = require('../services')

module.exports = {
  method: 'GET',
  path: '/get-pso-contacts/{x}/{y}',
  options: {
    description: 'Returns the psoContactDetails as json for a given Easting and Northing point in Englan',
    handler: async (request, h) => {
      try {
        const result = await services.getPsoContacts(request.params.x, request.params.y)
        if (!result || !Array.isArray(result.rows) || result.rows.length !== 1) {
          return Boom.badRequest('Invalid result', new Error('Expected an Array'))
        }
        return result.rows[0].get_pso_contacts
      } catch (err) {
        return Boom.badImplementation('get_pso_contacts failed', err)
      }
    },
    validate: {
      params: Joi.object().keys({
        x: Joi.number().max(700000).positive().required(),
        y: Joi.number().max(1300000).positive().required()
      })
    }
  }
}
