const Lab = require('lab')
const lab = exports.lab = Lab.script()
const Code = require('code')

const refnumber = require('../../server/util/refnumber')

lab.experiment('Application reference number: gereration', () => {
  lab.test('Application reference number: Test length', async () => {
    const applicationReferenceNumber = refnumber()
    Code.expect(applicationReferenceNumber).to.be.a.string()
    Code.expect(applicationReferenceNumber).to.be.a.string().length(16)
  })

  lab.test('Application reference number: Test uniqueness', async () => {
    const applicationReferenceNumber1 = refnumber()
    const applicationReferenceNumber2 = refnumber()
    Code.expect(applicationReferenceNumber1).not.equal(applicationReferenceNumber2)
  })
})
