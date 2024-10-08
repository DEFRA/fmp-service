module.exports = [].concat(
  require('./health-check'),
  require('./error'),
  require('./is-england'),
  require('./get-pso-contacts'),
  require('./get-pso-contacts-by-polygon'),
  require('./get-flood-zones-by-polygon'),
  require('./test-db'),
  require('./zones-by-polygon')
)
