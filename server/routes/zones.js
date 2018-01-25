const Joi = require('joi')
const Boom = require('boom')
const services = require('../services')

module.exports = {
  method: 'GET',
  path: '/zones/{x}/{y}/{radius}',
  options: {
    description: 'Gets the flood map for planning flood zones for a point and radius',
    handler: async (request, h) => {
      try {
        const result = await services.getFloodZones(request.params.x, request.params.y, request.params.radius)
        if (!result || !Array.isArray(result.rows) || result.rows.length !== 1) {
          return Boom.badRequest('Invalid result', new Error('Expected an Array'))
        }
        return result.rows[0].get_fmp_zones
      } catch (err) {
        return Boom.badImplementation('Database call failed', err)
      }
    },
    validate: {
      params: {
        x: Joi.number().max(700000).positive().required(),
        y: Joi.number().max(1300000).positive().required(),
        radius: Joi.number().integer().positive().required()
      }
    }
  }
}
