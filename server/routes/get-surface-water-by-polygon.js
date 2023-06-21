const Joi = require('joi')
const Boom = require('@hapi/boom')
const services = require('../services')

module.exports = {
  method: 'GET',
  path: '/surface-water-by-polygon',
  options: {
    description: 'Gets the surface water data for a polygon and radius',
    handler: async (request, h) => {
      try {
        console.log(request.query.polygon, request.query.radius)
        const result = await services.getSurfaceWaterByPolygon(request.query.polygon, request.query.radius || 0)

        if (!result || !Array.isArray(result.rows) || result.rows.length !== 1) {
          return Boom.badRequest('Invalid result', new Error('Expected an Array'))
        }

        return result.rows[0].calculate_surface_water_risk_from_polygon
      } catch (err) {
        return Boom.badImplementation('Database call failed', err)
      }
    },
    validate: {
      query: Joi.object().keys({
        polygon: Joi.string().required(),
        radius: Joi.number().integer().positive()
      })
    }
  }
}
