const queries = require('./queries.json')
const conn = require('../../config').database.connectionString
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: conn
})

module.exports = {
  getFloodZones: (x, y, radius) => {
    return pool.query(queries.getFloodZones, [x, y, radius])
  },
  isEngland: (x, y) => {
    return pool.query(queries.isEngland, [x, y])
  }
}
