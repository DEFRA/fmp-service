const Joi = require('joi')
const Boom = require('boom')
const services = require('../services')

module.exports = {
  method: 'GET',
  path: '/zones',
  options: {
    description: 'Gets the flood map for planning flood zones for a point and radius',
    handler: async (request, h) => {
      try {
        let result
        if (request.query.polygon) {
          const easting = request.query.polygon[0][0]
          const northing = request.query.polygon[0][1]
          result = await services.getFloodZones(easting, northing, request.params.radius)
        } else {
          const easting = request.query.easting
          const northing = request.query.northing
          result = await services.getFloodZones(easting, northing, request.params.radius)
        }

        if (!result || !Array.isArray(result.rows) || result.rows.length !== 1) {
          return Boom.badRequest('Invalid result', new Error('Expected an Array'))
        }

        return result.rows[0].get_fmp_zones
      } catch (err) {
        return Boom.badImplementation('Database call failed', err)
      }
    },
    validate: {
      query: Joi.alternatives().required().try([{
        easting: Joi.number().max(700000).positive().required(),
        northing: Joi.number().max(1300000).positive().required(),
        radius: Joi.number().integer().positive().required()
      }, {
        polygon: Joi.array().required().items(Joi.array().items(
          Joi.number().max(700000).positive().required(),
          Joi.number().max(1300000).positive().required()
        ))
      }])
    }
  }
}
