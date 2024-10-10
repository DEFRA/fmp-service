const Lab = require('@hapi/lab')
const lab = exports.lab = Lab.script()
const Code = require('@hapi/code')

lab.experiment('Ensure config is correct', () => {
  lab.test('test config', () => {
    Code.expect(function () {
      require('../server/config')
    }).not.to.throw()
  })

  lab.test('test an invalid config', () => {
    // Set process.env.NODE_ENV to an invalid value
    const nodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'INVALID'
    // Remove the cached file, so that it is revalidated
    delete require.cache[require.resolve('../server/config')]

    // Assert that an exception is thrown
    Code.expect(function () {
      require('../server/config')
    }).to.throw()
    // reset process.env.NODE_ENV to its original value
    process.env.NODE_ENV = nodeEnv
  })
})
