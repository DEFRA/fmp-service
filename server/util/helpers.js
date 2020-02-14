const sandboxURL = require('../../config').sandboxURL;
const Boom = require('boom');
const appgatewayURL = require('../../config').appgatewayURL;
const printServiceSubmitJobBaseURL = require('../../config').printServiceSubmitJobBaseURL;
const printServiceJobStatusAndMapsURL = require('../../config').printServiceJobStatusAndMapsURL

const replaceSandBoxURLWithAppGateWayURL = (url, sandboxURL, appgatewayURL) => {
    if (url && sandboxURL && appgatewayURL)
        try {
            return url.replace(sandboxURL, appgatewayURL)
        } catch (error) {
            return Boom.badRequest(`There is problem with the sandboxURL/appgatewayurl/url and sandboxURL/appgatewayurl/url is ${url / sandboxurl / appgatewayURL}`)
        }
    else {
        return url
    }
}
const createArrayOfMapUrls = (sandboxurlsObject) => {
    if (sandboxurlsObject && sandboxurlsObject.value && sandboxurlsObject.value.details) {
        var allmapUrlObject = sandboxurlsObject.value.details;
        const allmapUrlObjectWithAppgateway = allmapUrlObject.map(element => {
            return {
                title: checkforNullOrUndefinedOrEmpty(element.title),
                imageUrl: checkforNullOrUndefinedOrEmpty(replaceSandBoxURLWithAppGateWayURL(element.imageUrl, sandboxURL, appgatewayURL)),
                errorMessage: checkforNullOrUndefinedOrEmpty(element.errorMessage),
                modellingDate: checkforNullOrUndefinedOrEmpty(element.modellingDate),
                error: checkforNullOrUndefinedOrEmpty(element.error)
            }
        })
        return allmapUrlObjectWithAppgateway
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

checkforNullOrUndefinedOrEmpty = (item) => {
    if (typeof item === 'undefined' && item) {
        return ''
    } else {
        return item
    }
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
