var Joi = require('joi')
var Boom = require('boom')
var services = require('../services')

module.exports = {
  method: 'GET',
  path: '/zones/{x}/{y}/{radius}',
  config: {
    description: 'Gets the flood map for planning flood zones for a point and radius',
    handler: function (request, reply) {
      var db = request.pg.client
      var params = request.params
      services.getFloodZones(db, params.x, params.y, params.radius, function (err, result) {
        if (err) {
          return reply(Boom.badImplementation('Database call failed', err))
        }
        if (!result || !Array.isArray(result.rows) || result.rows.length !== 1) {
          return reply(Boom.badRequest('Invalid result'), new Error('Expected an Array'))
        }
        reply(result.rows[0].get_fmp_zones)
      })
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
