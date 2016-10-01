const { syncHistoryWithStore } = require('react-router-redux')
const { browserHistory } = require('react-router')
const store = require('js/store')

module.exports = syncHistoryWithStore(browserHistory, store)
