const Lab = require('lab')
const lab = exports.lab = Lab.script()
const Code = require('code')
const Hapi = require('hapi')

const server = Hapi.Server({
  host: 'localhost',
  port: 8050
})
const route = require('../../server/routes/reference-number')

server.route(route)

lab.experiment('route: reference-number', () => {
  lab.before(async () => {
    await server.start()
  })

  lab.after(async () => {
    await server.stop()
  })

  lab.test('Application Reference Number: new application reference is generated', async () => {
    const options = {
      method: 'GET',
      url: '/reference-number'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.be.a.string()
  })

  lab.test('Application Reference Number: Different application number is generated', async () => {
    const options = {
      method: 'GET',
      url: '/reference-number'
    }

    let count
    for (count = 0; count <= 3; count++) {
      const response1 = await server.inject(options)
      const response2 = await server.inject(options)
      Code.expect(response1.result).to.not.equal(response2.result)
    }
  })

  lab.test('Application Reference Number: It is of 16 alphabets', async () => {
    const options = {
      method: 'GET',
      url: '/reference-number'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result.length).to.equal(16)
  })

  lab.test('standard-text: 404 returned', async () => {
    const options = {
      method: 'GET',
      url: '/reference-number/test/hello'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })
})
