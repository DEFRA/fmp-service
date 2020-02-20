const Boom = require('boom')
const Wreck = require('@hapi/wreck')

var mapData = async function (pdfUrl) {
  try {
    if (pdfUrl) {
      const { payload } = await Wreck.get(pdfUrl, { payload: { output: 'data', parse: false } })
      if (payload) {
        const base64data = payload.toString('base64')
        var imageAsBase64 = 'data:image/png;base64,' + base64data
        return imageAsBase64
      } else {
        return Boom.badRequest('There occured an issue , where there is no payload information to get the image a varbinary')
      }
    } else {
      return ''
    }
  } catch (error) {
    return Boom.badRequest('Some Issue occured in getting the report Type data')
  }
}

module.exports = mapData
