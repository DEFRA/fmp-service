function generate () {
  const generate = require('nanoid/generate')
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return generate(alphabet, 16)
}

module.exports = generate
