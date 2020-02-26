const Boom = require('boom')
const Wreck = require('@hapi/wreck')

var mapData = async function (url) {
  try {
    const { payload } = await Wreck.get(url, { payload: { output: 'data', parse: false } })
    const base64data = payload.toString('base64')
    var imageAsBase64 = 'data:image/jpeg;base64,' + base64data
    return imageAsBase64
  } catch (error) {
    return Boom.badRequest(`Error occured in getting data from the ${url}`)
  }
}
module.exports = mapData
