const Joi = require('joi')
const Boom = require('@hapi/boom')
const services = require('../services')

module.exports = {
  method: 'GET',
  path: '/is-england/{x}/{y}',
  options: {
    description: 'Returns if Easting and Northing is within England polygon',
    handler: async (request, h) => {
      try {
        const result = await services.isEngland(request.params.x, request.params.y)
        if (!result || !Array.isArray(result.rows) || result.rows.length !== 1) {
          return Boom.badRequest('Invalid result', new Error('Expected an Array'))
        }
        return { is_england: result.rows[0].is_england }
      } catch (err) {
        return Boom.badImplementation('is-england failed', err)
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
