var config = require('../config')

const manifest = {
  server: {
    port: process.env.PORT || config.server.port,
    host: config.server.host
  },
  register: {
    plugins: []
  }//[
    // {
    //   plugin: {
    //     register: 'good',
    //     options: config.logging
    //   }
    // }
  //]
}

// if (config.errbit.postErrors) {
//   delete config.errbit.postErrors
//   manifest.register.plugins.push({
//     plugin: require('./plugins/airbrake'),
//     options: config.errbit
//   })
// }

module.exports = manifest
