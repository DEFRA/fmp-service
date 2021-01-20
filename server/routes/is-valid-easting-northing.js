const Joi = require('joi')
const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/is-valid-easting-northing/{x}/{y}',
  options: {
    description: 'Returns if Easting and Northing is Valid',
    handler: async (request, h) => {
      try {
        var response = { isValid: false, easting: { eastingError: '', isValid: false }, northing: { isValid: false, northingError: '' } }
        var x = request.params.x
        var y = request.params.y
        if (x !== null && x !== '') {
          if (x >= 0 && x <= 7000000) {
            response.easting.isValid = true
          } else {
            response.easting.isValid = false
            response.eastingError = 'Enter an valid Easting'
          }
        }
        if (y !== null && y !== '') {
          if (y >= 0 && y <= 1300000) {
            response.northing.isValid = true
          } else {
            response.northing.isValid = false
            response.northingError = 'Enter a valid Northing'
          }
        }
        if (response.easting.isValid && response.northing.isValid) {
          response.isValid = true
        } else {
          response.isValid = false
        }
        return response
      } catch (err) {
        return Boom.badImplementation('is-valid-easting-northing failed', err)
      }
    },
    validate: {
      params: {
        x: Joi.number().max(700000).positive().required(),
        y: Joi.number().max(1300000).positive().required()
      }
    }
  }
}
