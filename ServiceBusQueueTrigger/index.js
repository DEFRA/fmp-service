module.exports = async function (context, mySbMsg) {
  context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg)
  // const receivedPayload = JSON.parse(JSON.stringify(mySbMsg))
  // const {x, y, customerName, customerEmailAddress, applicationReferenceNumber} = receivedPayload
}