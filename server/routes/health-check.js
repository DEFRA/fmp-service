const { version } = require('../../version.js')

module.exports = {
  method: 'GET',
  path: '/health-check',
  options: {
    description: 'Static health-check page for fmp-service',
    handler: async () => {
      return JSON.stringify({
        name: 'fmp-service',
        version
      })
    }
  }
}
