const Lab = require('lab')
const lab = exports.lab = Lab.script()
const Code = require('code')
const Hapi = require('hapi')
const server = Hapi.Server({
  host: 'localhost',
  port: 8050
})
const route = require('../../server/routes/is-england')
server.route(route)

let services = require('../../server/services')

lab.experiment('route: is-england', () => {
  lab.before(async () => {
    await server.start()
  })

  lab.after(async () => {
    await server.stop()
  })

  // Happy tests
  lab.test('is-england: Happy1 is england', async () => {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
    }
    // Mock isEngland
    services.isEngland = async (x, y) => {
      return {
        rows: [
          {
            is_england: true
          }
        ]
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.be.a.object()
    Code.expect(response.result).to.equal({ is_england: true })
  })

  lab.test('is-england: Happy2 not england', async () => {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
    }

    // Mock isEngland
    services.isEngland = async (x, y) => {
      return {
        rows: [
          {
            is_england: false
          }
        ]
      }
    }

    const response = await server.inject(options)

    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.be.a.object()
    Code.expect(response.result).to.equal({ is_england: false })
  })

  lab.test('is-england: Database error', async () => {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
    }
    // Mock isEngland
    services.isEngland = async (x, y) => {
      throw new Error('test error')
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(500)
  })

  lab.test('is-england: Invalid data returned', async () => {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
    }

    // Mock isEngland
    services.isEngland = async (x, y) => {
      return null
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('is-england: Invalid data returned 2', async () => {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
    }

    // Mock isEngland
    services.isEngland = async (x, y) => {
      return {
        rows: [
          {
            is_england: true
          }, {
            is_england: false
          }
        ]
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('is-england: Invalid data returned 3', async () => {
    var options = {
      method: 'GET',
      url: '/is-england/362066/387295'
    }
    // Mock isEngland
    services.isEngland = async (x, y) => {
      return {
        rows: 'error'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  // Unhappy tests
  lab.test('is-england no params', async () => {
    var options = {
      method: 'GET',
      url: '/is-england'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('is-england: invalid easting', async () => {
    var options = {
      method: 'GET',
      url: '/is-england/800000/600000'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('is-england: invalid northing', async () => {
    var options = {
      method: 'GET',
      url: '/is-england/400000/-120'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('is-england: invalid radius', async () => {
    var options = {
      method: 'GET',
      url: '/is-england/400000/600000'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })
})
