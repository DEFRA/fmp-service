const Boom = require('boom')
const fs = require('fs-extra')
const path = require('path')
const filePath = path.join(__dirname, '../../data/standard-text.json')

module.exports = {
  method: 'GET',
  path: '/standard-text',
  options: {
    description: 'Returns all standard-text',
    handler: async (request, h) => {
      try {
        const standardTextData = fs.readJsonSync(filePath)
        return Object.freeze(standardTextData)
      } catch (err) {
        return Boom.badImplementation('standard-text failed', err)
      }
    }
  }
}
