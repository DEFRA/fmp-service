module.exports = async function (context, req) {
  context.log(req.body)
  context.bindings.outputSbQueue = []
  context.bindings.outputSbQueue.push(req.body)
  context.done()
}
