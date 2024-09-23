const Lab = require('@hapi/lab')
const lab = exports.lab = Lab.script()
const Code = require('@hapi/code')

lab.experiment('Ensure config is correct', () => {
  lab.test('test config', () => {
    Code.expect(function () {
      require('../server/config')
    }).not.to.throw()
  })
})
