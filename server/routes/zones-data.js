var fs = require('fs')
const Boom = require('boom')
module.exports = {
  method: 'GET',
  path: '/zones/{zoneNumber}',
  options: {
    description: 'Based on Zone Number passed, it will send static data as HTML',
    handler: async (request, h) => {
      try {
        var zoneNumber = request.params.zoneNumber
        var filePath = process.env.PWD + `/data/flood-zones/${zoneNumber}.html`
        if (fs.existsSync(filePath)) {
          return fs.readFileSync(filePath, { encoding: 'utf-8' })
        } else {
          return Boom.badImplementation('Error occured in getting the file location')
        }
      } catch (err) {
        return Boom.badImplementation('Error occured in getting the Zones data')
      }
    }
  }
}
