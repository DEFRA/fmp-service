'user strict'

const Lab = require('lab')
const lab = exports.lab = Lab.script()
const Code = require('code')
const Hapi = require('hapi')
const server = Hapi.Server({
  host: 'localhost',
  port: 8050
})
const route = require('../../server/routes/zones-by-polygon')
server.route(route)

let services = require('../../server/services')

const dbResponse = {
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

  lab.test('zones: polygon', async () => {
    const options = {
      method: 'GET',
      url: '/zones-by-polygon?polygon=[[400000, 600000]]'
    }

    // Mock getFloodZones
    services.getFloodZonesByPolygon = (polygon) => {
      return {
        rows: [
          {
            get_fmp_zones_by_polygon: dbResponse
          }
        ]
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })
})
