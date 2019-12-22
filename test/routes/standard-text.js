const Lab = require('lab')
const lab = exports.lab = Lab.script()
const Code = require('code')
const Hapi = require('hapi')
const standardTextJson = require('../../data/standard-text.json')

const server = Hapi.Server({
  host: 'localhost',
  port: 8050
})
const route = require('../../server/routes/standard-text')
const sectionRoute = require('../../server/routes/standard-text-by-section')

server.route(route)
server.route(sectionRoute)

lab.experiment('route: standard-text', () => {
  lab.before(async () => {
    await server.start()
  })

  lab.after(async () => {
    await server.stop()
  })

  // Happy tests
  lab.test('standard-text: all sections are displayed', async () => {
    const options = {
      method: 'GET',
      url: '/standard-text'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.be.a.object()
  })

  lab.test('standard-text: success ok', async () => {
    const options = {
      method: 'GET',
      url: '/standard-text'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('standard-text: 404 returned', async () => {
    const options = {
      method: 'GET',
      url: '/standard-text/test/hello'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('standard-text sectionRequested', async () => {
    const options = {
      method: 'GET',
      url: '/standard-text/Optional'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.equal(standardTextJson['Optional'])
  })
})
