const sandboxURL = require('../../config').sandboxURL;
const appgatewayURL = require('../../config').appgatewayURL;
const printServiceSubmitJobBaseURL = require('../../config').printServiceSubmitJobBaseURL;
const printServiceJobStatusAndMapsURL = require('../../config').printServiceJobStatusAndMapsURL

const replaceSandBoxURLWithAppGateWayURL = (url, sandboxURL, appgatewayURL) => {
    return url.replace(sandboxURL, appgatewayURL)
}
const createArrayOfMapUrls = (sandboxurlsObject) => {
    var allMapUrlASAppgateway = []
    if (sandboxurlsObject && sandboxurlsObject.value && sandboxurlsObject.value.details) {
        var allMapUrls = sandboxurlsObject.value.details;
        const mapURLsAsArrayAndObject = Object.values(allMapUrls)
        mapURLsAsArrayAndObject.map(item => {
            if (Array.isArray(item)) {
                allMapUrlASAppgateway.push(item.map(urlOfItem => {
                    return replaceSandBoxURLWithAppGateWayURL(urlOfItem, sandboxURL, appgatewayURL)
                }))
            } else {
                allMapUrlASAppgateway.push(replaceSandBoxURLWithAppGateWayURL(item, sandboxURL, appgatewayURL))
            }
        })
        return allMapUrlASAppgateway
    }
}

const constructPrintServiceURL = (x, y) => {
    const resourceUrl = `geometry={"x": ${x},"y": ${y},"spatialReference": {"wkid": 27700}}&f=json`
    const fullPrintServiceSubmitJobBaseURL = `${printServiceSubmitJobBaseURL}?${resourceUrl}`;
    return fullPrintServiceSubmitJobBaseURL
}

const constructPrintServiceJobStatusAndMapsURL = (jobId) => {
    return `${printServiceJobStatusAndMapsURL}${jobId}/results/output?f=pjson`
}

const constructJobStatusURL = (jobId) => {
    return `${printServiceJobStatusAndMapsURL}${jobId}?f=json`
}
const jobStatus = {
    SUCCESS: 'esriJobSucceeded'
}
module.exports = {
    createArrayOfMapUrls: createArrayOfMapUrls,
    replaceSandBoxURLWithAppGateWayURL: replaceSandBoxURLWithAppGateWayURL,
    constructPrintServiceURL: constructPrintServiceURL,
    constructPrintServiceJobStatusAndMapsURL: constructPrintServiceJobStatusAndMapsURL,
    constructJobStatusURL: constructJobStatusURL,
    jobStatus: jobStatus
}
