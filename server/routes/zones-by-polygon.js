const Joi = require('joi')
const Boom = require('boom')
const services = require('../services')

module.exports = {
  method: 'GET',
  path: '/zones-by-polygon',
  options: {
    description: 'Gets the flood map for planning flood zones for a polygon in geojson format',
    handler: async (request, h) => {
      try {
        const result = await services.getFloodZonesByPolygon(request.query.polygon)

        if (!result || !Array.isArray(result.rows) || result.rows.length !== 1) {
          return Boom.badRequest('Invalid result', new Error('Expected an Array'))
        }

        return result.rows[0].get_fmp_zones_by_polygon
      } catch (err) {
        return Boom.badImplementation('Database call failed', err)
      }
    },
    validate: {
      query: {
        // TODO improve validation to geojson or json
        polygon: Joi.string().required()
      }
    }
  }
}
