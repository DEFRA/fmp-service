const Boom = require('boom');
const Wreck = require('@hapi/wreck');
const printServiceSubmitJobBaseURL = require('../../config').printServiceSubmitJobBaseURL;
const printServiceJobStatusAndMapsURL = require('../../config').printServiceJobStatusAndMapsURL
module.exports = {
    method: 'GET',
    path: '/printservice',
    options: {
        description: 'Returns Print Service Data',
        handler: async (request, h) => {
            try {
                const x = 383819
                const y = 398052
                const resourceUrl = `geometry={"x": ${x},"y": ${y},"spatialReference": {"wkid": 27700}}&f=json`
                const fullPrintServiceSubmitJobBaseURL = `${printServiceSubmitJobBaseURL}?${resourceUrl}`;
                const { res, payload } = await Wreck.get(fullPrintServiceSubmitJobBaseURL)
                var payloadResponseASJson = JSON.parse(payload.toString())

                while (payloadResponseASJson.jobStatus !== 'esriJobSucceeded') {
                    var newURL = `${printServiceJobStatusAndMapsURL}${payloadResponseASJson.jobId}?f=json`
                    const { result, payload } = await Wreck.get(newURL)
                    var t = JSON.parse(payload.toString())
                    payloadResponseASJson.jobStatus = t.jobStatus;
                    if (payloadResponseASJson.jobStatus == 'esriJobSucceeded') {
                        const { result, payload } = await Wreck.get(`${printServiceJobStatusAndMapsURL}${payloadResponseASJson.jobId}/results/output?f=pjson`)
                        var pdfMapsURLObject = JSON.parse(payload.toString());
                        if (pdfMapsURLObject && pdfMapsURLObject.value && pdfMapsURLObject.value.details) {
                            return pdfMapsURLObject.value.details;
                        } else {
                            return Boom.badRequest("Issue occurred in getting the pdf map urls")
                        }
                    }
                }
                return 'Error occured in getting Maps URL'
            }
            catch (error) {
                return Boom.badRequest({ error }, "Some Issue occured in getting the data from print service")
            }
        }
    }
}
