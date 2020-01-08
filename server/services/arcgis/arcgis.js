const Wreck = require('@hapi/wreck');
const Boom = require('boom');
const mapData = require('./map-data')

async function getMap(url) {
    try {
        //URL for the Map Server
        const { res, payload } = await Wreck.get(url);
        const payloadResult = JSON.parse(payload.toString());
        if (!payloadResult) {
            return Boom.badImplementation('error occured in payload data', err);
        }
        if (!payloadResult.results) {
            return Boom.badImplementation('error occured in payload data', err);
        }
        if (!payloadResult.results[0].value) {
            return Boom.badImplementation('error occured in payload data', err);
        }
        if (!payloadResult.results[0].value.url) {
            return Boom.badImplementation('error occured in getting url data', err);
        }
        var result = payloadResult.results[0].value.url;
        if (result.includes('http')) {
            console.log(result);
            return await mapData(result);
        }
        return Boom.badRequest("Some Issue occured in getting arcgis data")

    } catch (error) {
        return Boom.badRequest("Some Issue occured in getting arcgis data");
    }
}
module.exports = getMap;