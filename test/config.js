var Lab = require('lab')
var lab = exports.lab = Lab.script()
var Code = require('code')

lab.experiment('Ensure config is correct', () => {
  lab.test('test config', () => {
    Code.expect(function () {
      require('../config')
    }).not.to.throw()
  })
})
