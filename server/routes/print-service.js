const Boom = require('boom')
const Wreck = require('@hapi/wreck')
const printServiceUrl = require('../../config').printServiceURL
module.exports = {
  method: 'GET',
  path: '/printservice',
  options: {
    description: 'Returns Print Service Data',
    handler: async (request, h) => {
      try {
        const x = 383819
        const y = 398052
        const resourceUrl = `geometry={x:${x},y:${y},spatialReference:{wkid:27000}}&f=json`
        const fullPrintServiceURL = `${printServiceUrl}?${resourceUrl}`
        const { res, payload } = await Wreck.get(fullPrintServiceURL)
        var payloadResponseASJson = JSON.parse(payload.toString())
        return payloadResponseASJson
      } catch (error) {
        return Boom.badRequest({ error }, 'Some Issue occured in getting the data from print service')
      }
    }
  }
}
