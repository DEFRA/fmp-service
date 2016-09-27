var Joi = require('joi')
var Boom = require('boom')
var services = require('../services')

module.exports = {
  method: 'GET',
  path: '/is-england/{x}/{y}',
  config: {
    description: 'Returns if Easting and Northing is within England polygon',
    handler: function (request, reply) {
      var db = request.pg.client
      var params = request.params
      services.isEngland(db, params.x, params.y, function (err, result) {
        if (err) {
          return reply(Boom.badImplementation('Database call failed', err))
        }
        if (!result || !Array.isArray(result.rows) || result.rows.length !== 1) {
          return reply(Boom.badRequest('Invalid result'), new Error('Expected an Array'))
        }
        reply({ is_england: result.rows[0].is_england })
      })
    },
    validate: {
      params: {
        x: Joi.number().max(700000).positive().required(),
        y: Joi.number().max(1300000).positive().required()
      }
    }
  }
}
