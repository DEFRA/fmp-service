const { version } = require('../../version.js')

console.log('Starting version ', version)

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
