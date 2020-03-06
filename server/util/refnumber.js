function generate () {
  const generate = require('nanoid/generate')
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return generate(alphabet, 10)
}
module.exports = generate
