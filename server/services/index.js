const queries = require('./queries.json')
const conn = require('../../config').database.connectionString
const ltfConnectionString = require('../../config').database.ltfConnectionString
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: conn
})

const ltfPool = ltfConnectionString ? new Pool({ connectionString: ltfConnectionString }) : undefined

module.exports = {
  getFloodZones: (x, y, radius) => {
    return pool.query(queries.getFloodZones, [x, y, radius])
  },
  getFloodZonesByPolygon: (polygon) => {
    return pool.query(queries.getFloodZonesByPolygon, [polygon])
  },
  isEngland: (x, y) => {
    return pool.query(queries.isEngland, [x, y])
  },
  getPsoContacts: (x, y) => pool.query(queries.getPsoContacts, [x, y]),
  getPsoContactsByPolygon: polygon => pool.query(queries.getPsoContactsByPolygon, [polygon]),
  getSurfaceWater: (x, y, radius = 10) => {
    if (ltfPool) {
      return ltfPool.query(queries.getSurfaceWater, [x, y, radius])
    }
    return { rows: [{ calculate_surface_water_risk: {} }] }
  },
  getSurfaceWaterByPolygon: (polygon, radius = 0) => {
    if (ltfPool) {
      return ltfPool.query(queries.getSurfaceWaterByPolygon, [polygon, radius])
    }
    return { rows: [{ calculate_surface_water_risk_from_polygon: {} }] }
  }
}
