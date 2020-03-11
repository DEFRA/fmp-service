const crmService = require('../server/routes/dynamics-crm-service')
const printService = require('../server/routes/print-service').options

module.exports = async function (context, mySbMsg) {
  context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg)
  const receivedPayload = JSON.parse(JSON.stringify(mySbMsg))
  const { name, email, x, y, applicationReferenceNumber } = receivedPayload
  console.log(name, email, x, y, applicationReferenceNumber)
  var location = x + ',' + y
  var fmfpCustomerPayload = {
    customerName: name,
    emailAddress: email,
    location: location,
    applicationReferenceNumber: applicationReferenceNumber

  }
  console.log(fmfpCustomerPayload)
  try {
    // Saving customer details into CRM
    const result = await crmService(fmfpCustomerPayload)
    console.log('Customer details saved', result)

    // Creating request as if requested over http
    var request = {
      params: {
        x: x,
        y: y
      }
    }
    // calling print service.
    printService.handler(request)
  } catch (error) {
    console.log(error)
  }
}
