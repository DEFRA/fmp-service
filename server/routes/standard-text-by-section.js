const Boom = require('boom')
const standardTextData = require('../../data/standard-text.json')

module.exports = {
  method: 'GET',
  path: '/standard-text/{sectionRequested}',
  options: {
    description: 'Returns all standard-text',
    handler: async (request, h) => {
      try {
        let key = request.params.sectionRequested
        if (key) {
          if (standardTextData.hasOwnProperty(key)) {
            return Object.freeze(standardTextData[key])
          }
          return {}
        }
      } catch (err) {
        return Boom.badImplementation('standard-text failed', err)
      }
    }
  }
}
