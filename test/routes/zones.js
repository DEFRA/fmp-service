'user strict'

var Lab = require('lab')
var lab = exports.lab = Lab.script()
var Code = require('code')
var Hapi = require('hapi')
const server = Hapi.Server({
  host: 'localhost',
  port: 8050
})
const route = require('../../server/routes/zones')
server.route(route)

let services = require('../../server/services')

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

lab.experiment('zones', () => {
  lab.before(async () => {
    await server.start()
  })

  lab.after(async () => {
    await server.stop()
  })

  // Happy tests
  lab.test('zones: Happy1', async () => {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }

    // Mock getFloodZones
    services.getFloodZones = (x, y) => {
      return {
        rows: [
          {
            get_fmp_zones: dbResponse
          }
        ]
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.be.an.object()
    Code.expect(response.result).to.equal(dbResponse)
  })

  lab.test('zones: Database error', async () => {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }
    // Mock getFloodZones
    services.getFloodZones = (x, y) => {
      throw new Error('Test error')
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(500)
  })

  lab.test('zones: Invalid data returned', async () => {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }
    // Mock getFloodZones
    services.getFloodZones = (x, y) => {
      return null
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('zones: Invalid data returned 2', async () => {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }
    // Mock getFloodZones
    services.getFloodZones = (x, y) => {
      return {
        rows: [
          {
            get_fmp_zones: dbResponse
          }, {
            get_fmp_zones: dbResponse
          }
        ]
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('zones: Invalid data returned 3', async () => {
    var options = {
      method: 'GET',
      url: '/zones/362066/387295/50'
    }
    // Mock getFloodZones
    services.getFloodZones = (x, y) => {
      return {
        rows: 'error'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  // Unhappy tests
  lab.test('zones no params', async () => {
    var options = {
      method: 'GET',
      url: '/zones'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('zones: invalid easting', async () => {
    var options = {
      method: 'GET',
      url: '/zones/800000/600000/50'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('zones: invalid northing', async () => {
    var options = {
      method: 'GET',
      url: '/zones/400000/-120/50'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('zones: invalid radius', async () => {
    var options = {
      method: 'GET',
      url: '/zones/400000/600000/50.12'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })
})
