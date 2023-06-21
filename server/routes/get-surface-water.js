const Joi = require('joi')
const Boom = require('@hapi/boom')
const services = require('../services')

module.exports = {
  method: 'GET',
  path: '/surface-water/{easting}/{northing}/{radius}',
  options: {
    description: 'Gets the surface water data for a point and radius',
    handler: async (request, h) => {
      try {
        const result = await services.getSurfaceWater(request.params.easting, request.params.northing, request.params.radius)

        if (!result || !Array.isArray(result.rows) || result.rows.length !== 1) {
          return Boom.badRequest('Invalid result', new Error('Expected an Array'))
        }

        return result.rows[0].calculate_surface_water_risk
      } catch (err) {
        return Boom.badImplementation('Database call failed', err)
      }
    },
    validate: {
      params: Joi.object().keys({
        easting: Joi.number().max(700000).positive().required(),
        northing: Joi.number().max(1300000).positive().required(),
        radius: Joi.number().integer().positive().required()
      })
    }
  }
}
