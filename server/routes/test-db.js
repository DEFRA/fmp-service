const Boom = require('@hapi/boom')

module.exports = {
  method: 'GET',
  path: '/test-db',
  options: {
    description: 'Simple route to test that the database connection functions and returns data',
    handler: async (request, h) => {
      try {
        const db = request.pg.client
        const result = await db.query('select count(1) from fmp.defences')
        if (!result || !result.rows) {
          return Boom.badImplementation('no results')
        }
      } catch (err) {
        return Boom.badImplementation('db call failed', err)
      }
    }
  }
}
