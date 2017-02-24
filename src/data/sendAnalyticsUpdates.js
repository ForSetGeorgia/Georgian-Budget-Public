const ReactGA = require('react-ga')
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID
if (googleAnalyticsId) ReactGA.initialize(googleAnalyticsId)

let pathname = ''

/*
This function sends a pageview update to google analytics ONLY if the
pathname has changed since the last pageview. Otherwise, the Routes
will send this change every time the URL updates, which means
a new page view every time the query changes.
*/
const logPageView = () => {
  if (!window || !googleAnalyticsId) return

  // only sending new pathname if the pathname has changed since
  // last route update
  if (pathname === window.location.pathname) return
  pathname = window.location.pathname

  ReactGA.set({ page: pathname })
  ReactGA.pageview(pathname)
}

const sendAnalyticsUpdates = () => {
  logPageView()
}

module.exports = sendAnalyticsUpdates
