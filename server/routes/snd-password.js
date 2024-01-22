const services = require('../services')

module.exports = [
  {
    method: 'GET',
    path: '/snd-password',
    handler: async (request, h) => {
      const { rows } = await services.getSndPassword()
      const { snd_password='' } = rows[0]
      return {snd_password: snd_password.trim()}
    }
  }
]
