var Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/test-db',
  config: {
    description: 'Simple route to test that the database connection functions and returns data',
    handler: function (request, reply) {
      var db = request.pg.client
      db.query('select count(1) from fmp.defences', function (err, result) {
        if (err) {
          return reply(Boom.badImplementation('db call failed', err))
        }
        if (!result || !result.rows) {
          return reply(Boom.badImplementation('no results'))
        }
        reply(result.rows)
      })
    }
  }
}
