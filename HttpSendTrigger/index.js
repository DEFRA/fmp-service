// module.exports = async function (context, req) {
//   context.log('JavaScript HTTP trigger function processed a request.')

//   if (req.query.name || (req.body && req.body.name)) {
//     context.res = {
//       // status: 200, /* Defaults to 200 */
//       body: 'Hello ' + (req.query.name || req.body.name)
//     }
//   } else {
//     context.res = {
//       status: 400,
//       body: 'Please pass a name on the query string or in the request body'
//     }
//   }
// }

module.exports = async function (context, req) {
  var message
  if (req.query.name || (req.body && req.body.name)) {
    message = 'Hello ' + (req.query.name || req.body.name)
  } else {
    message = 'Service Bus queue message created at ' + Date.now()
  }

  context.log(message)
  context.bindings.outputSbQueue = []
  context.bindings.outputSbQueue.push('1 ' + message)
  context.bindings.outputSbQueue.push('2 ' + message)
  context.done()
}
