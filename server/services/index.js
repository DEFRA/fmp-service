var queries = require('./queries.json')
module.exports = {
  getFloodZones: function (db, x, y, radius, callback) {
    return db.query(queries.getFloodZones, [x, y, radius], callback)
  },
  isEngland: function (db, x, y, callback) {
    return db.query(queries.isEngland, [x, y], callback)
  }
}
