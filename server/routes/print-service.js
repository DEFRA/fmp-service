const Boom = require('boom')
const Wreck = require('@hapi/wreck')
const mapdata = require('./pdf-report/map-data')
const helpers = require('./../util/helpers')
const completedPDF = require('./../routes/pdf-report/completed-pdf')

module.exports = {
  method: 'GET',
  path: '/printservice/{x}/{y}',
  options: {
    description: 'Returns Print Service Data',
    handler: async (request) => {
      try {
        const fullPrintServiceSubmitJobBaseURL = helpers.constructPrintServiceURL(request.params.x, request.params.y)

        const { payload } = await Wreck.get(fullPrintServiceSubmitJobBaseURL)
        var payloadResponseASJson = JSON.parse(payload.toString())

        while (payloadResponseASJson.jobStatus !== helpers.jobStatus.SUCCESS) {
          var jobStatusURL = helpers.constructJobStatusURL(payloadResponseASJson.jobId)
          const { payload } = await Wreck.get(jobStatusURL)
          var submittedJob = JSON.parse(payload.toString())

          payloadResponseASJson.jobStatus = submittedJob.jobStatus
          if (payloadResponseASJson.jobStatus === helpers.jobStatus.SUCCESS) {
            const printServiceJobStatusAndMapsURL = helpers.constructPrintServiceJobStatusAndMapsURL(payloadResponseASJson.jobId)
            const { payload } = await Wreck.get(printServiceJobStatusAndMapsURL)
            var pdfMapsURLObject = JSON.parse(payload.toString())
            if (pdfMapsURLObject.value.error !== true) {
              var appgatewayURLWithData = helpers.createArrayOfMapUrls(pdfMapsURLObject)
              for (const [, value] of Object.entries(appgatewayURLWithData)) {
                for (let [innerKey, innerValue] of Object.entries(value)) {
                  if (innerKey === 'imageUrl') {
                    innerValue = await mapdata(innerValue)
                    value.imageUrl = innerValue
                  }
                }
              }
              return await completedPDF(appgatewayURLWithData)
            } else {
              return Boom.badRequest(`There is problem occured in executing and getting the pdf mps png url's as success flag is ${false}`)
            }
          }
        }
      } catch (error) {
        return Boom.badRequest({ error }, 'Some Issue occured in getting the data from print service')
      }
    }
  }
}
