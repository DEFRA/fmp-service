const Lab = require('@hapi/lab')
const lab = exports.lab = Lab.script()
const Code = require('@hapi/code')
const Hapi = require('@hapi/hapi')

const server = Hapi.Server({
  host: 'localhost',
  port: 8050
})

server.route(require('../../server/routes/health-check'))

lab.experiment('health-check', () => {
  lab.before(async () => {
    await server.start()
  })

  lab.after(async () => {
    await server.stop()
  })

  lab.test('health-check', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/health-check'
    })
    Code.expect(response.statusCode).to.equal(200)
    const { payload } = response
    Code.expect(payload).to.equal('{"name":"fmp-service","version":"v3.0.0.0"}')
  })
})
