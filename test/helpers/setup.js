// Run JavaScript files through babel before handing them over to node
// to be tested. The node environment doesn't understand all of the
// ES2015 code used, so this is a necessary workaround.
require('babel-register')
require('babel-polyfill')

// Uses the jsdom package to create a browser-like environment for
// the tests to run in. This way, the tests can use the document, window
// and navigator global variables.
// global.document = require('jsdom').jsdom('<body><div id="app"></div></body>')
// global.window = document.defaultView
// global.navigator = window.navigator
