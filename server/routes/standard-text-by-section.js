const Boom = require('boom')
const fs = require('fs-extra')
const path = require('path')
const filePath = path.join(__dirname, '../../data/standard-text.json')
module.exports = {
  method: 'GET',
  path: '/standard-text/{sectionRequested}',
  options: {
    description: 'Returns standard-text by section',
    handler: async (request, h) => {
      try {
        const standardTextData = fs.readJsonSync(filePath)
        let key = request.params.sectionRequested
        if (key) {
          if (standardTextData.hasOwnProperty(key)) {
            return Object.freeze(standardTextData[key])
          }
          return {}
        }
      } catch (err) {
        return Boom.badImplementation('standard-text by section failed', err)
      }
    }
  }
}
