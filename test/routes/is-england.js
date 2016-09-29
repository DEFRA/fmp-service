var Lab = require('lab')
var lab = exports.lab = Lab.script()
var Code = require('code')
var Hapi = require('hapi')
var server = new Hapi.Server()
var route = require('../../server/routes/is-england.js')

server.connection({ port: 8050 })
server.route(route)

lab.experiment('route: is-england', function () {
  lab.before((done) => {
    server.start((err) => {
      if (err) {
        throw err
      }
      done()
    })
  })

  // Happy tests
  lab.test('is-england: Happy1 is england', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
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
                    is_england: true
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
      Code.expect(response.result).to.be.a.object()
      Code.expect(response.result).to.equal({ is_england: true })
      server.stop(done)
    })
  })

  lab.test('is-england: Happy2 not england', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
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
                    is_england: false
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
      Code.expect(response.result).to.be.a.object()
      Code.expect(response.result).to.equal({ is_england: false })
      server.stop(done)
    })
  })

  lab.test('is-england: Database error', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
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

  lab.test('is-england: Invalid data returned', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
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

  lab.test('is-england: Invalid data returned 2', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
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
                    is_england: true
                  }, {
                    is_england: false
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

  lab.test('is-england: Invalid data returned 3', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
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
  lab.test('is-england no params', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england'
    }

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(404)
      server.stop(done)
    })
  })

  lab.test('is-england: invalid easting', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england/800000/600000'
    }

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done)
    })
  })

  lab.test('is-england: invalid northing', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england/400000/-120'
    }

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done)
    })
  })

  lab.test('is-england: invalid radius', function (done) {
    var options = {
      method: 'GET',
      url: '/is-england/400000/600000'
    }

    server.inject(options, function (response) {
      Code.expect(response.statusCode).to.equal(400)
      server.stop(done)
    })
  })
})
