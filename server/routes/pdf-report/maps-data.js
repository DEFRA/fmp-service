const Boom = require('boom');
const Wreck = require('@hapi/wreck');

var mapData = async function (pdfUrl) {
    try {
        const { res, payload } = await Wreck.get(pdfUrl, { payload: { output: 'data', parse: false } })
        let base64data = payload.toString('base64');
        var imageAsBase64 = 'data:image/jpeg;base64,' + base64data;
        return imageAsBase64
    }
    catch (error) {
        return Boom.badRequest("Some Issue occured in getting the report Type data")
    }
}
module.exports = mapData;