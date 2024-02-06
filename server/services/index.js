const queries = require('./queries.json')
const conn = require('../../config').database.connectionString
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: conn
})

module.exports = {
  getFloodZonesByPolygon: (polygon) => {
    return pool.query(queries.getFloodZonesByPolygon, [polygon])
  },
  isEngland: (x, y) => {
    return pool.query(queries.isEngland, [x, y])
  },
  getPsoContacts: (x, y) => pool.query(queries.getPsoContacts, [x, y]),
  getPsoContactsByPolygon: polygon => pool.query(queries.getPsoContactsByPolygon, [polygon])
}
