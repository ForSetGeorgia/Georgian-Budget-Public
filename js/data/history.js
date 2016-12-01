const { syncHistoryWithStore } = require('react-router-redux')
const { browserHistory } = require('react-router')
const store = require('./store')

module.exports = syncHistoryWithStore(browserHistory, store)
