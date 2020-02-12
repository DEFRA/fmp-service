const Boom = require('boom');
const Wreck = require('@hapi/wreck');
const printServiceJobStatusAndMapsURL = require('../../config').printServiceJobStatusAndMapsURL

const mapdata = require('./../routes/pdf-report/maps-data')
const helpers = require('./../util/helpers')
module.exports = {
  method: 'GET',
  path: '/printservice',
  options: {
    description: 'Returns Print Service Data',
    handler: async (request, h) => {
      try {
        const x = 383819
        const y = 398052
        const fullPrintServiceSubmitJobBaseURL = helpers.constructPrintServiceURL(x, y)
        const { res, payload } = await Wreck.get(fullPrintServiceSubmitJobBaseURL)
        var payloadResponseASJson = JSON.parse(payload.toString())
        while (payloadResponseASJson.jobStatus !== 'esriJobSucceeded') {
          var newURL = `${printServiceJobStatusAndMapsURL}${payloadResponseASJson.jobId}?f=json`
          const { result, payload } = await Wreck.get(newURL)
          var submittedJob = JSON.parse(payload.toString())
          payloadResponseASJson.jobStatus = submittedJob.jobStatus;
          if (payloadResponseASJson.jobStatus == 'esriJobSucceeded') {
            const { result, payload } = await Wreck.get(`${printServiceJobStatusAndMapsURL}${payloadResponseASJson.jobId}/results/output?f=pjson`)
            var pdfMapsURLObject = JSON.parse(payload.toString());
            var appgatewayURL = helpers.createArrayOfMapUrls(pdfMapsURLObject)
            var floodMapImage = mapdata(appgatewayURL[0])
            var HistoricImage = mapdata(historicFloodMapUR[1])
            var modelledMapImage = mapdata(modelledMapUrls[2])
            var allImages = [await floodMapImage, await HistoricImage, await modelledMapImage]
            return allImages
          }
        }
      }
      catch (error) {
        return Boom.badRequest({ error }, "Some Issue occured in getting the data from print service")
      }
    }
  }
}



