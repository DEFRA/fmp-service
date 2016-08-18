var Lab = require('lab')
var lab = exports.lab = Lab.script()
var Code = require('code')

lab.experiment('dummy experiment', function () {
  lab.test('dummy test', function (done) {
    Code.expect(1).to.equal(1)
    done()
  })
})
