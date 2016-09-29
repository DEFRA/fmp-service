var Lab = require('lab')
var lab = exports.lab = Lab.script()
var Code = require('code')
var Hapi = require('hapi')
var server = new Hapi.Server()
var route = require('../../server/routes/zones.js')

server.connection({ port: 8050 })
server.route(route)

var dbResponse = {
  'point_in_england': true,
  'buffer_in_england': true,
  'england_error': false,
  'floodzone_3': false,
  'floodzone_3_error': false,
  'areas_benefiting': false,
  'areas_benefiting_error': false,
  'floodzone_2': true,
  'floodzone_2_error': false
}

lab.experiment('zones', function () {
  lab.before((done) => {
    server.start((err) => {
      if (err) {
        throw err
      }
      done()
    })
  })

  // Happy tests
  lab.test('zones: Happy1', function (done) {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }
    // Mock the postgres database query
    server.ext('onPreHandler', (request, reply) => {
      request.pg = {
        client: {
          query: (var1, var2, callback) => {
            process.nextTick(() => {
              callback(null, {
                rows: [
                  {
                    get_fmp_zones: dbResponse
                  }
                ]
              })
            })
          }
        },
        kill: false
      }
      reply.continue()
    })

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(200)
      Code.expect(response.result).to.be.an.object()
      Code.expect(response.result).to.equal(dbResponse)
      server.stop(done)
    })
  })

  lab.test('zones: Database error', function (done) {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }
    // Mock the postgres database query
    server.ext('onPreHandler', (request, reply) => {
      request.pg = {
        client: {
          query: (var1, var2, callback) => {
            process.nextTick(() => {
              callback(new Error('database error', null))
            })
          }
        },
        kill: false
      }
      reply.continue()
    })

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(500)
      server.stop(done)
    })
  })

  lab.test('zones: Invalid data returned', function (done) {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }
    // Mock the postgres database query
    server.ext('onPreHandler', (request, reply) => {
      request.pg = {
        client: {
          query: (var1, var2, callback) => {
            process.nextTick(() => {
              callback(null, null)
            })
          }
        },
        kill: false
      }
      reply.continue()
    })

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done)
    })
  })

  lab.test('zones: Invalid data returned 2', function (done) {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }
    // Mock the postgres database query
    server.ext('onPreHandler', (request, reply) => {
      request.pg = {
        client: {
          query: (var1, var2, callback) => {
            process.nextTick(() => {
              callback(null, {
                rows: [
                  {
                    get_fmp_zones: dbResponse
                  }, {
                    get_fmp_zones: dbResponse
                  }
                ]
              })
            })
          }
        },
        kill: false
      }
      reply.continue()
    })

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done)
    })
  })

  lab.test('zones: Invalid data returned 3', function (done) {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }
    // Mock the postgres database query
    server.ext('onPreHandler', (request, reply) => {
      request.pg = {
        client: {
          query: (var1, var2, callback) => {
            process.nextTick(() => {
              callback(null, {
                rows: 'error'
              })
            })
          }
        },
        kill: false
      }
      reply.continue()
    })

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done)
    })
  })

  // Unhappy tests
  lab.test('zones no params', function (done) {
    var options = {
      method: 'GET',
      url: '/zones'
    }

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(404)
      server.stop(done)
    })
  })

  lab.test('zones: invalid easting', function (done) {
    var options = {
      method: 'GET',
      url: '/zones/800000/600000/50'
    }

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done)
    })
  })

  lab.test('zones: invalid northing', function (done) {
    var options = {
      method: 'GET',
      url: '/zones/400000/-120/50'
    }

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done)
    })
  })

  lab.test('zones: invalid radius', function (done) {
    var options = {
      method: 'GET',
      url: '/zones/400000/600000/50.12'
    }

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done)
    })
  })
})
