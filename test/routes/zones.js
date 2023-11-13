'user strict'

const Lab = require('@hapi/lab')
const lab = exports.lab = Lab.script()
const Code = require('@hapi/code')
const Hapi = require('@hapi/hapi')
const server = Hapi.Server({
  host: 'localhost',
  port: 8050
})

lab.experiment('zones', () => {
  lab.before(async () => {
    await server.start()
  })

  lab.after(async () => {
    await server.stop()
  })

  lab.test('/zones should not exist', async () => {
    const options = {
      method: 'GET',
      url: '/zones/362066/387295/1'
    }

    // Mock getFloodZones
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
    Code.expect(response.result).to.be.an.object()
    Code.expect(response.result).to.equal({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found'
    })
  })

  lab.test('zones no params', async () => {
    const options = {
      method: 'GET',
      url: '/zones'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })
})
